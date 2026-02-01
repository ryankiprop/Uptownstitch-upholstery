# Uptown Stitch Upholstery Guy

A custom full-stack web application for Uptown Stitch Upholstery Guy, built with React + Flask. This application provides a modern, scalable platform for showcasing upholstery services and products.

## Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Responsive design** (mobile-first)

### Backend
- **Flask** with RESTful API
- **SQLAlchemy ORM** for database management
- **Flask-CORS** for cross-origin requests
- **SQLite** (development) / **PostgreSQL-ready** (production)
- **Simple token authentication** for admin functions

## Project Structure

```
windsurf-project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── public/
│   └── package.json
├── backend/                  # Flask backend application
│   ├── app/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Backend utilities
│   │   └── __init__.py
│   ├── migrations/         # Database migrations
│   ├── config.py
│   └── requirements.txt
└── README.md
```

## Features

### Customer-Facing
- **Home page** with hero section and featured products
- **Services page** showcasing upholstery services
- **Products page** with shop-style grid layout
- **Product detail pages** with full information
- **Gallery/portfolio** showcasing completed work
- **Contact form** with backend submission

### Admin Management
- **Product management** (CRUD operations)
- **Service management**
- **Gallery management**
- **Contact message management**
- **Simple token-based authentication**

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd windsurf-project
   ```

2. **Backend setup**
   ```bash
   cd backend
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   python seed_data.py  # Load sample data
   python run.py
   ```

3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///uptown_stitch.db
ADMIN_TOKEN=your-admin-token-here
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `GET /api/services` - Get all services
- `GET /api/gallery` - Get gallery items
- `POST /api/contact` - Submit contact form

### Admin Endpoints (requires Authorization header)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- Similar endpoints for services and gallery

## Deployment

### Frontend (Netlify/Vercel)
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your preferred platform
3. Set environment variables for API URL

### Backend (Render/Fly.io)
1. Set environment variables
2. Use PostgreSQL for production database
3. Ensure proper CORS settings for your frontend domain

## Development

### Adding New Products
Use the admin endpoints or directly access the admin interface (if implemented) to add new products with images, descriptions, and pricing.

### Customizing Styles
Modify Tailwind CSS configuration in `tailwind.config.js` and update components in `frontend/src/components/`.

### Database Changes
1. Modify models in `backend/app/models/`
2. Generate migration: `flask db migrate -m "Description"`
3. Apply migration: `flask db upgrade`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Uptown Stitch Upholstery Guy.

## Support

For technical support or questions about this application, please contact the development team.
