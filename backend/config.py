import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///uptown_stitch.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN') or 'admin-token-change-in-production'
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Production settings
    DEBUG = False
    TESTING = False
    
    # CORS settings
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
    # In production, override with actual domain
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
    'default': DevelopmentConfig
}
