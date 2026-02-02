from app import create_app, db
from app.models import Product

def seed_data():
    app = create_app()
    with app.app_context():
        # Clear existing data
        Product.query.delete()
        
        # Sample Products
        products = [
            Product(
                name="Custom Seat Upholstery - Premium Leather",
                description="Complete custom seat upholstery using premium grade leather. Perfect for restoring classic vehicles or upgrading modern interiors.",
                price=899.99,
                category="Seat Upholstery",
                image_url="https://source.unsplash.com/oUBsRHzWei8/1200x800",
                in_stock=True,
                featured=True
            ),
            Product(
                name="Dashboard Restoration Kit",
                description="Complete dashboard restoration package including cleaning, repair, and protective coating. Restores original look and feel.",
                price=349.99,
                category="Dashboard",
                image_url="https://source.unsplash.com/8syAWhHxbf0/1200x800",
                in_stock=True,
                featured=True
            ),
            Product(
                name="Door Panel Upholstery Set",
                description="Custom door panel upholstery with premium materials. Includes armrests, speaker covers, and trim pieces.",
                price=449.99,
                category="Door Panels",
                image_url="https://source.unsplash.com/c_SwKUwevu0/1200x800",
                in_stock=True,
                featured=False
            ),
            Product(
                name="Headliner Replacement",
                description="Complete headliner replacement with premium fabric. Available in various colors and materials.",
                price=299.99,
                category="Headliners",
                image_url="https://source.unsplash.com/ewpuwoLoMvk/1200x800",
                in_stock=True,
                featured=False
            ),
            Product(
                name="Custom Console Upholstery",
                description="Custom center console upholstery with premium materials. Includes storage compartments and cup holders.",
                price=199.99,
                category="Consoles",
                image_url="https://source.unsplash.com/4icreuz-Qv0/1200x800",
                in_stock=True,
                featured=False
            ),
            Product(
                name="Carpet Kit - Full Interior",
                description="Complete carpet replacement kit for full interior. Custom-fit for your vehicle model.",
                price=599.99,
                category="Carpet",
                image_url="https://source.unsplash.com/6q7OewPW6rQ/1200x800",
                in_stock=True,
                featured=True
            )
        ]
        
        # Add all data to database
        for product in products:
            db.session.add(product)
        
        db.session.commit()
        print("Sample data seeded successfully!")

if __name__ == '__main__':
    seed_data()
