from app import create_app, db
from app.models import Product, Service, GalleryItem

def seed_data():
    app = create_app()
    with app.app_context():
        # Clear existing data
        Product.query.delete()
        Service.query.delete()
        GalleryItem.query.delete()
        
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
        
        # Sample Services
        services = [
            Service(
                title="Complete Interior Restoration",
                description="Full vehicle interior restoration including seats, dashboard, door panels, headliner, and carpet. We bring your vehicle's interior back to life with attention to detail and quality craftsmanship.",
                image_url="https://via.placeholder.com/600x400/2F4F4F/FFFFFF?text=Complete+Restoration",
                featured=True
            ),
            Service(
                title="Custom Seat Design",
                description="Bespoke seat design and upholstery tailored to your preferences. Choose from premium materials, custom stitching, and personalized designs.",
                image_url="https://via.placeholder.com/600x400/8B4513/FFFFFF?text=Custom+Seat+Design",
                featured=True
            ),
            Service(
                title="Classic Car Interior",
                description="Specialized interior restoration for classic and vintage vehicles. Period-correct materials and techniques to maintain authenticity.",
                image_url="https://via.placeholder.com/600x400/4682B4/FFFFFF?text=Classic+Car+Interior",
                featured=False
            ),
            Service(
                title="Marine Upholstery",
                description="Professional marine upholstery services for boats and yachts. Water-resistant materials and durable construction.",
                image_url="https://via.placeholder.com/600x400/4682B4/FFFFFF?text=Marine+Upholstery",
                featured=False
            )
        ]
        
        # Sample Gallery Items
        gallery_items = [
            GalleryItem(
                title="1967 Chevy Impala Interior Restoration",
                description="Complete interior restoration of a classic 1967 Chevy Impala with period-correct materials and colors.",
                image_url="https://via.placeholder.com/600x400/8B4513/FFFFFF?text=1967+Impala+Interior",
                category="Classic Cars",
                featured=True
            ),
            GalleryItem(
                title="Modern SUV Luxury Interior",
                description="Premium leather upgrade for a modern SUV with custom stitching and embroidered logos.",
                image_url="https://via.placeholder.com/600x400/2F4F4F/FFFFFF?text=Luxury+SUV+Interior",
                category="Modern Vehicles",
                featured=True
            ),
            GalleryItem(
                title="Custom Truck Interior",
                description="Heavy-duty truck interior with durable materials and custom storage solutions.",
                image_url="https://via.placeholder.com/600x400/556B2F/FFFFFF?text=Custom+Truck+Interior",
                category="Trucks",
                featured=False
            ),
            GalleryItem(
                title="Convertible Top Replacement",
                description="Professional convertible top replacement with premium canvas and waterproof sealing.",
                image_url="https://via.placeholder.com/600x400/4682B4/FFFFFF?text=Convertible+Top",
                category="Convertibles",
                featured=False
            ),
            GalleryItem(
                title="Vintage Dashboard Restoration",
                description="Meticulous restoration of a vintage dashboard with original gauges and trim.",
                image_url="https://via.placeholder.com/600x400/708090/FFFFFF?text=Vintage+Dashboard",
                category="Classic Cars",
                featured=True
            ),
            GalleryItem(
                title="Custom Racing Seats",
                description="Professional racing seat installation with custom upholstery and safety harness integration.",
                image_url="https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Racing+Seats",
                category="Performance",
                featured=False
            )
        ]
        
        # Add all data to database
        for product in products:
            db.session.add(product)
        
        for service in services:
            db.session.add(service)
        
        for item in gallery_items:
            db.session.add(item)
        
        db.session.commit()
        print("Sample data seeded successfully!")

if __name__ == '__main__':
    seed_data()
