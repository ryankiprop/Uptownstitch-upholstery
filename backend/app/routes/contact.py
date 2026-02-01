from flask import Blueprint, request, jsonify
from app.models.contact import ContactMessage
from app import db

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    """Submit a contact form message"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({'error': f'{field} is required'}), 400
        
        contact_message = ContactMessage(
            name=data['name'].strip(),
            email=data['email'].strip(),
            phone=data.get('phone', '').strip(),
            subject=data['subject'].strip(),
            message=data['message'].strip()
        )
        
        db.session.add(contact_message)
        db.session.commit()
        
        return jsonify({
            'message': 'Contact form submitted successfully',
            'id': contact_message.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
