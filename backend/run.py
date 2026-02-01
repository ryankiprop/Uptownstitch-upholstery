import os
from app import create_app, db
from app.models import Product, Service, GalleryItem, ContactMessage

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'Product': Product,
        'Service': Service,
        'GalleryItem': GalleryItem,
        'ContactMessage': ContactMessage
    }

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
