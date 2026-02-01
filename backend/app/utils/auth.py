from functools import wraps
from flask import request, jsonify
from flask import current_app

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'error': 'Authorization token is required'}), 401
        
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]
        
        if token != current_app.config['ADMIN_TOKEN']:
            return jsonify({'error': 'Invalid authorization token'}), 401
        
        return f(*args, **kwargs)
    
    return decorated_function
