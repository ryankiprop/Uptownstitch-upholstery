import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    # Read DATABASE_URL from env; if it's a placeholder (contains angle brackets)
    # ignore it and fall back to the local sqlite file to avoid startup crashes.
    _db_url = os.environ.get('DATABASE_URL', '')
    if _db_url and ('<' in _db_url or '>' in _db_url):
        _db_url = ''
    SQLALCHEMY_DATABASE_URI = _db_url or 'sqlite:///uptown_stitch.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN') or 'admin-token-change-in-production'
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Production settings
    DEBUG = False
    TESTING = False
    
    # CORS settings - read from env or use defaults
    _cors_env = os.environ.get('CORS_ORIGINS', '')
    if _cors_env:
        CORS_ORIGINS = [origin.strip() for origin in _cors_env.split(',')]
    else:
        CORS_ORIGINS = [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "https://uptownstitch.com",
            "https://www.uptownstitch.com",
            "https://uptownstitch-upholstery.vercel.app"
        ]
    
class DevelopmentConfig(Config):
    DEBUG = True
    CORS_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
    
class ProductionConfig(Config):
    DEBUG = False
    # In production, read from env or use defaults
    _cors_env = os.environ.get('CORS_ORIGINS', '')
    if _cors_env:
        CORS_ORIGINS = [origin.strip() for origin in _cors_env.split(',')]
    else:
        CORS_ORIGINS = [
            "https://uptownstitch.com",
            "https://www.uptownstitch.com",
            "https://uptownstitch-upholstery.vercel.app"
        ]
    
class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    # "default" is used when FLASK_CONFIG isn't set (e.g. many hosts set FLASK_ENV instead).
    # Keep this permissive enough to allow both local dev and the deployed frontend origin.
    'default': Config
}
