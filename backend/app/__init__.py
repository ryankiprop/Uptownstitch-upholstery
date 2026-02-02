from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from config import config
from flask import send_from_directory

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Configure CORS with dynamic origins (explicit resources for /api/*)
    # Manual CORS header injection (Cloudflare/Render doesn't work with Flask-CORS)
    allowed_origins = app.config.get("CORS_ORIGINS", ["*"])
    
    @app.after_request
    def add_cors_headers(response):
        origin = request.headers.get("Origin", "")
        if origin in allowed_origins or "*" in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin if origin else "*"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

    # Register blueprints
    from app.routes.products import products_bp
    from app.routes.services import services_bp
    from app.routes.gallery import gallery_bp
    from app.routes.contact import contact_bp
    from app.routes.admin import admin_bp
    
    app.register_blueprint(products_bp, url_prefix='/api')
    app.register_blueprint(services_bp, url_prefix='/api')
    app.register_blueprint(gallery_bp, url_prefix='/api')
    app.register_blueprint(contact_bp, url_prefix='/api')
    app.register_blueprint(admin_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'service': 'uptown-stitch-api'}

    # Serve uploaded files (development only)
    @app.route('/uploads/<path:filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config.get('UPLOAD_FOLDER'), filename)
    

    # Ensure CORS headers are present for browser requests (fallback)
    from flask import request
    @app.after_request
    def add_cors_headers(response):
        origin = request.headers.get('Origin')
        cors_origins = app.config.get('CORS_ORIGINS', '*')
        if cors_origins == '*' or origin in (cors_origins if isinstance(cors_origins, (list, tuple)) else [cors_origins]):
            response.headers['Access-Control-Allow-Origin'] = origin if origin else '*'; response.headers['Vary'] = 'Origin'
        return response
    # Optionally auto-seed database on startup when AUTO_SEED=1
    try:
        if os.environ.get('AUTO_SEED','0') == '1':
            from app.routes.admin import seed_products
            with app.app_context():
                try:
                    created = seed_products()
                    if created:
                        app.logger.info(f"AUTO_SEED created {created} products")
                except Exception as e:
                    app.logger.error(f"AUTO_SEED failed: {e}")
    except Exception:
        pass

    return app
