from flask import Blueprint, request, jsonify
from app.models.gallery import GalleryItem

gallery_bp = Blueprint('gallery', __name__)

@gallery_bp.route('/gallery', methods=['GET'])
def get_gallery():
    """Get all gallery items with optional filtering"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 12, type=int)
        category = request.args.get('category')
        featured = request.args.get('featured', type=bool)
        
        query = GalleryItem.query
        
        if category:
            query = query.filter(GalleryItem.category == category)
        if featured:
            query = query.filter(GalleryItem.featured == True)
        
        gallery_items = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'items': [item.to_dict() for item in gallery_items.items],
            'total': gallery_items.total,
            'pages': gallery_items.pages,
            'current_page': page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@gallery_bp.route('/gallery/<int:item_id>', methods=['GET'])
def get_gallery_item(item_id):
    """Get a specific gallery item by ID"""
    try:
        item = GalleryItem.query.get_or_404(item_id)
        return jsonify(item.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@gallery_bp.route('/gallery/categories', methods=['GET'])
def get_gallery_categories():
    """Get all unique gallery categories"""
    try:
        categories = GalleryItem.query.with_entities(GalleryItem.category).distinct().all()
        return jsonify([cat[0] for cat in categories if cat[0]])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@gallery_bp.route('/gallery/featured', methods=['GET'])
def get_featured_gallery():
    """Get featured gallery items only"""
    try:
        items = GalleryItem.query.filter(GalleryItem.featured == True).order_by(GalleryItem.created_at.desc()).all()
        return jsonify([item.to_dict() for item in items])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
