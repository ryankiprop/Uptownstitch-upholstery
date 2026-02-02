from flask import Blueprint, request, jsonify
from app.models.product import Product
from app.models.service import Service
from app.models.gallery import GalleryItem
from app.models.contact import ContactMessage
from app.utils.auth import token_required
from app import db
from app.utils.storage import upload_file

admin_bp = Blueprint('admin', __name__)

# Helper to programmatically seed products (idempotent)
def seed_products():
    """Create sample products if none exist. Returns number of products created."""
    try:
        if Product.query.first():
            return 0

        products_data = [
            {
                'name': 'Custom Seat Upholstery - Premium Leather',
                'description': 'Complete custom seat upholstery using premium grade leather. Perfect for restoring classic vehicles or upgrading modern interiors.',
                'price': 899.99,
                'category': 'Seat Upholstery',
                'image_url': '/uploads/product_1.jpg',
                'featured': True,
                'in_stock': True
            },
            {
                'name': 'Dashboard Restoration Kit',
                'description': 'Complete dashboard restoration package including cleaning, repair, and protective coating. Restores original look and feel.',
                'price': 599.99,
                'category': 'Dashboard',
                'image_url': '/uploads/product_2.jpg',
                'featured': True,
                'in_stock': True
            },
            {
                'name': 'Door Panel Upholstery Set',
                'description': 'Custom door panel upholstery with premium fabrics. Includes installation guidance and high-quality stitching.',
                'price': 449.99,
                'category': 'Door Panels',
                'image_url': '/uploads/product_3.jpg',
                'featured': True,
                'in_stock': True
            },
            {
                'name': 'Headliner Replacement',
                'description': 'Complete headliner replacement service with professional installation. Choose from various fabric options.',
                'price': 349.99,
                'category': 'Headliner',
                'image_url': '/uploads/product_4.jpg',
                'featured': True,
                'in_stock': True
            },
            {
                'name': 'Custom Console Upholstery',
                'description': 'Premium console and armrest upholstery for modern comfort and style.',
                'price': 279.99,
                'category': 'Console',
                'image_url': '/uploads/product_5.jpg',
                'featured': False,
                'in_stock': True
            },
            {
                'name': 'Carpet Kit - Full Interior',
                'description': 'Complete interior carpet replacement kit. High-quality materials that match OEM specifications.',
                'price': 699.99,
                'category': 'Carpet',
                'image_url': '/uploads/product_6.jpg',
                'featured': False,
                'in_stock': True
            }
        ]

        for product_data in products_data:
            product = Product(**product_data)
            db.session.add(product)

        db.session.commit()
        return len(products_data)

    except Exception:
        db.session.rollback()
        raise


# Product Management
@admin_bp.route('/admin/products', methods=['POST'])
@token_required
def create_product():
    """Create a new product"""
    try:
        data = request.get_json(silent=True)
        if not data:
            data = request.form.to_dict()

        required_fields = ['name', 'price', 'category']
        for field in required_fields:
            if field not in data or not str(data[field]).strip():
                return jsonify({'error': f'{field} is required'}), 400

        image_url = ''
        image_file = request.files.get('image')
        if image_file:
            image_url = upload_file(image_file)
        else:
            image_url = data.get('image_url', '').strip()

        product = Product(
            name=data['name'].strip(),
            description=data.get('description', '').strip(),
            price=float(data['price']),
            category=data['category'].strip(),
            image_url=image_url,
            in_stock=data.get('in_stock', True),
            featured=data.get('featured', False)
        )

        db.session.add(product)
        db.session.commit()

        return jsonify(product.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/admin/products/<int:product_id>', methods=['PUT'])
@token_required
def update_product(product_id):
    """Update an existing product"""
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json(silent=True)
        if not data:
            data = request.form.to_dict()

        image_file = request.files.get('image')
        if image_file:
            product.image_url = upload_file(image_file)

        if 'name' in data:
            product.name = data['name'].strip()
        if 'description' in data:
            product.description = data['description'].strip()
        if 'price' in data:
            product.price = float(data['price'])
        if 'category' in data:
            product.category = data['category'].strip()
        if 'image_url' in data and not image_file:
            product.image_url = data['image_url'].strip()
        if 'in_stock' in data:
            product.in_stock = bool(data['in_stock'])
        if 'featured' in data:
            product.featured = bool(data['featured'])

        db.session.commit()
        return jsonify(product.to_dict())

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/admin/products/<int:product_id>', methods=['DELETE'])
@token_required
def delete_product(product_id):
    """Delete a product"""
    try:
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()

        return jsonify({'message': 'Product deleted successfully'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Service Management
@admin_bp.route('/admin/services', methods=['POST'])
@token_required
def create_service():
    """Create a new service"""
    try:
        data = request.get_json(silent=True)
        if not data:
            data = request.form.to_dict()

        if not data.get('title') or not data.get('description'):
            return jsonify({'error': 'Title and description are required'}), 400

        image_url = ''
        image_file = request.files.get('image')
        if image_file:
            image_url = upload_file(image_file)
        else:
            image_url = data.get('image_url', '').strip()

        service = Service(
            title=data['title'].strip(),
            description=data['description'].strip(),
            image_url=image_url,
            featured=data.get('featured', False)
        )

        db.session.add(service)
        db.session.commit()

        return jsonify(service.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/admin/services/<int:service_id>', methods=['PUT'])
@token_required
def update_service(service_id):
    """Update an existing service"""
    try:
        service = Service.query.get_or_404(service_id)
        data = request.get_json(silent=True)
        if not data:
            data = request.form.to_dict()

        image_file = request.files.get('image')
        if image_file:
            service.image_url = upload_file(image_file)

        if 'title' in data:
            service.title = data['title'].strip()
        if 'description' in data:
            service.description = data['description'].strip()
        if 'image_url' in data and not image_file:
            service.image_url = data['image_url'].strip()
        if 'featured' in data:
            service.featured = bool(data['featured'])

        db.session.commit()
        return jsonify(service.to_dict())

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/admin/services/<int:service_id>', methods=['DELETE'])
@token_required
def delete_service(service_id):
    """Delete a service"""
    try:
        service = Service.query.get_or_404(service_id)
        db.session.delete(service)
        db.session.commit()

        return jsonify({'message': 'Service deleted successfully'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Gallery Management
@admin_bp.route('/admin/gallery', methods=['POST'])
@token_required
def create_gallery_item():
    """Create a new gallery item"""
    try:
        data = request.get_json(silent=True)
        if not data:
            data = request.form.to_dict()

        image_file = request.files.get('image')
        image_url = data.get('image_url', '').strip()
        if image_file:
            image_url = upload_file(image_file)

        if not data.get('title') or not image_url:
            return jsonify({'error': 'Title and image_url are required'}), 400

        item = GalleryItem(
            title=data['title'].strip(),
            description=data.get('description', '').strip(),
            image_url=image_url,
            category=data.get('category', '').strip(),
            featured=data.get('featured', False)
        )

        db.session.add(item)
        db.session.commit()

        return jsonify(item.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/admin/gallery/<int:item_id>', methods=['PUT'])
@token_required
def update_gallery_item(item_id):
    """Update an existing gallery item"""
    try:
        item = GalleryItem.query.get_or_404(item_id)
        data = request.get_json(silent=True)
        if not data:
            data = request.form.to_dict()

        image_file = request.files.get('image')
        if image_file:
            item.image_url = upload_file(image_file)

        if 'title' in data:
            item.title = data['title'].strip()
        if 'description' in data:
            item.description = data['description'].strip()
        if 'image_url' in data and not image_file:
            item.image_url = data['image_url'].strip()
        if 'category' in data:
            item.category = data['category'].strip()
        if 'featured' in data:
            item.featured = bool(data['featured'])

        db.session.commit()
        return jsonify(item.to_dict())

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/admin/gallery/<int:item_id>', methods=['DELETE'])
@token_required
def delete_gallery_item(item_id):
    """Delete a gallery item"""
    try:
        item = GalleryItem.query.get_or_404(item_id)
        db.session.delete(item)
        db.session.commit()

        return jsonify({'message': 'Gallery item deleted successfully'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Contact Messages Management
@admin_bp.route('/admin/contact-messages', methods=['GET'])
@token_required
def get_contact_messages():
    """Get all contact messages"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        status = request.args.get('status')

        query = ContactMessage.query

        if status:
            query = query.filter(ContactMessage.status == status)

        messages = query.order_by(ContactMessage.created_at.desc()).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

        return jsonify({
            'messages': [message.to_dict() for message in messages.items],
            'total': messages.total,
            'pages': messages.pages,
            'current_page': page
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/admin/contact-messages/<int:message_id>', methods=['PUT'])
@token_required
def update_contact_message(message_id):
    """Update contact message status"""
    try:
        message = ContactMessage.query.get_or_404(message_id)
        data = request.get_json(silent=True)
        if not data:
            data = request.form.to_dict()

        if 'status' in data:
            message.status = data['status']
            db.session.commit()

        return jsonify(message.to_dict())

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/admin/contact-messages/<int:message_id>', methods=['DELETE'])
@token_required
def delete_contact_message(message_id):
    """Delete a contact message"""
    try:
        message = ContactMessage.query.get_or_404(message_id)
        db.session.delete(message)
        db.session.commit()

        return jsonify({'message': 'Contact message deleted successfully'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Seed/Init helpers (admin-only)
@admin_bp.route('/admin/seed', methods=['POST'])
@token_required
def seed_database():
    """Initialize database with sample products (admin-only)."""
    try:
        created = seed_products()
        if created == 0:
            return jsonify({'message': 'Database already seeded'}), 200
        return jsonify({'message': f'Database seeded successfully with {created} products', 'count': created}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/admin/init-db', methods=['POST'])
@token_required
def init_database():
    """Initialize database schema by creating all tables (admin-only)."""
    try:
        db.create_all()
        return jsonify({'message': 'Database schema initialized'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
