from flask import Flask
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
    cors_origins = app.config.get('CORS_ORIGINS', '*')
    # Apply CORS to all routes (wildcard) so browser Origin requests receive proper headers
    if isinstance(cors_origins, (list, tuple)):
        CORS(app, resources={r"/*": {"origins": cors_origins}})
    else:
        CORS(app, resources={r"/*": {"origins": cors_origins}})
    
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
            response.headers['Access-Control-Allow-Origin'] = origin if origin else '*'
            response.headers['Vary'] = 'Origin'
        return response
    return app
