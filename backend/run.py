import os
from app import create_app, db
from app.models import Product, ContactMessage

config_name = os.getenv('FLASK_CONFIG') or os.getenv('FLASK_ENV') or 'default'
app = create_app(config_name)

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'Product': Product,
        'ContactMessage': ContactMessage
    }

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
