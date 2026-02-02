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
                image_url="https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Custom+Leather+Seats",
                in_stock=True,
                featured=True
            ),
            Product(
                name="Dashboard Restoration Kit",
                description="Complete dashboard restoration package including cleaning, repair, and protective coating. Restores original look and feel.",
                price=349.99,
                category="Dashboard",
                image_url="https://via.placeholder.com/400x300/2F4F4F/FFFFFF?text=Dashboard+Restoration",
                in_stock=True,
                featured=True
            ),
            Product(
                name="Door Panel Upholstery Set",
                description="Custom door panel upholstery with premium materials. Includes armrests, speaker covers, and trim pieces.",
                price=449.99,
                category="Door Panels",
                image_url="https://via.placeholder.com/400x300/4682B4/FFFFFF?text=Door+Panels",
                in_stock=True,
                featured=False
            ),
            Product(
                name="Headliner Replacement",
                description="Complete headliner replacement with premium fabric. Available in various colors and materials.",
                price=299.99,
                category="Headliners",
                image_url="https://via.placeholder.com/400x300/708090/FFFFFF?text=Headliner+Replacement",
                in_stock=True,
                featured=False
            ),
            Product(
                name="Custom Console Upholstery",
                description="Custom center console upholstery with premium materials. Includes storage compartments and cup holders.",
                price=199.99,
                category="Consoles",
                image_url="https://via.placeholder.com/400x300/556B2F/FFFFFF?text=Console+Upholstery",
                in_stock=True,
                featured=False
            ),
            Product(
                name="Carpet Kit - Full Interior",
                description="Complete carpet replacement kit for full interior. Custom-fit for your vehicle model.",
                price=599.99,
                category="Carpet",
                image_url="https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Full+Carpet+Kit",
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
