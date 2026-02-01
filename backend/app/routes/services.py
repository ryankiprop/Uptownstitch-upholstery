from flask import Blueprint, jsonify
from app.models.service import Service

services_bp = Blueprint('services', __name__)

@services_bp.route('/services', methods=['GET'])
def get_services():
    """Get all services"""
    try:
        services = Service.query.order_by(Service.featured.desc(), Service.created_at.desc()).all()
        return jsonify([service.to_dict() for service in services])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@services_bp.route('/services/<int:service_id>', methods=['GET'])
def get_service(service_id):
    """Get a specific service by ID"""
    try:
        service = Service.query.get_or_404(service_id)
        return jsonify(service.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@services_bp.route('/services/featured', methods=['GET'])
def get_featured_services():
    """Get featured services only"""
    try:
        services = Service.query.filter(Service.featured == True).order_by(Service.created_at.desc()).all()
        return jsonify([service.to_dict() for service in services])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
