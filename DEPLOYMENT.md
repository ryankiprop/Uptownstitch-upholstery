# Deployment Guide - Uptown Stitch Upholstery Guy

This guide covers deployment for both development and production environments.

## Quick Start (Development)

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### 1. Clone and Setup
```bash
git clone <repository-url>
cd windsurf-project
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

# Create .env file from example
copy .env.example .env

# Initialize database
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Load sample data
python seed_data.py

# Start backend server
python run.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file from example
copy .env.example .env

# Start frontend server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Production Deployment

### Backend (Render.com)

1. **Create Render Account**
   - Sign up at [render.com](https://render.com)

2. **Create PostgreSQL Database**
   - Create a new PostgreSQL service
   - Note the connection string

3. **Deploy Flask App**
   - Connect your GitHub repository
   - Use these settings:
     ```
     Build Command: pip install -r requirements.txt
     Start Command: python run.py
     Environment Variables:
       - FLASK_ENV: production
       - DATABASE_URL: your-postgres-connection-string
       - SECRET_KEY: your-production-secret-key
       - ADMIN_TOKEN: your-production-admin-token
     ```

4. **Run Database Migrations**
   - Access the Render shell
   - Run: `flask db upgrade`
   - Run: `python seed_data.py` (optional)

### Frontend (Netlify/Vercel)

#### Netlify Deployment

1. **Create Netlify Account**
   - Sign up at [netlify.com](https://netlify.com)

2. **Build and Deploy**
   - Connect your GitHub repository
   - Use these settings:
     ```
     Build command: npm run build
     Publish directory: dist
     Environment Variables:
       - VITE_API_URL: https://your-backend-url.onrender.com/api
     ```

#### Vercel Deployment

1. **Create Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)

2. **Deploy**
   - Connect your GitHub repository
   - Vercel will auto-detect the React/Vite setup
   - Set environment variable:
     ```
     VITE_API_URL: https://your-backend-url.onrender.com/api
     ```

## Environment Variables

### Backend (.env)
```
FLASK_APP=run.py
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-here-change-in-production
DATABASE_URL=postgresql://username:password@host:port/database
ADMIN_TOKEN=your-secure-admin-token-here
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Security Considerations

1. **Change Default Credentials**
   - Always change default admin tokens
   - Use strong, unique secrets

2. **Database Security**
   - Use PostgreSQL in production
   - Enable SSL connections
   - Regular backups

3. **API Security**
   - The admin token provides full access
   - Keep it secure and rotate regularly
   - Consider implementing rate limiting

4. **File Uploads**
   - Configure proper file size limits
   - Validate file types
   - Consider using cloud storage (AWS S3, Cloudinary)

## Performance Optimization

### Backend
- Enable database connection pooling
- Implement caching (Redis)
- Use CDN for static assets
- Enable gzip compression

### Frontend
- Enable code splitting
- Optimize images
- Use lazy loading
- Implement service workers

## Monitoring and Maintenance

### Backend Monitoring
- Use application monitoring (Sentry, New Relic)
- Set up database monitoring
- Monitor API response times

### Frontend Monitoring
- Use error tracking (Sentry)
- Monitor Core Web Vitals
- Set up uptime monitoring

## Backup Strategy

### Database Backups
```bash
# PostgreSQL backup
pg_dump -h host -U username database > backup.sql

# Restore
psql -h host -U username database < backup.sql
```

### File Backups
- Regularly backup uploaded files
- Store backups in multiple locations
- Test restore procedures

## Scaling Considerations

### Horizontal Scaling
- Use load balancers
- Implement session management
- Consider microservices architecture

### Database Scaling
- Read replicas
- Database sharding
- Caching layers

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is in CORS origins
   - Check API URL configuration

2. **Database Connection Issues**
   - Verify connection string
   - Check firewall rules
   - Ensure database is running

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors

### Debug Commands

```bash
# Backend logs
heroku logs --tail  # or Render logs

# Frontend build debug
npm run build -- --mode production

# Database connection test
python -c "from app import create_app, db; app = create_app(); app.app_context().push(); print('Database connected:', db.engine.execute('SELECT 1').scalar())"
```

## Support

For deployment issues:
1. Check the logs first
2. Verify environment variables
3. Test database connectivity
4. Review the documentation

Contact the development team for additional support.
