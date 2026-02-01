# Deployment Checklist - Uptown Stitch Upholstery Guy

## Pre-Deployment Checklist

### ✅ Frontend (React)
- [ ] Install dependencies: `npm install`
- [ ] Update environment variables: `VITE_API_URL`
- [ ] Test build: `npm run build`
- [ ] Verify SEO meta tags are working
- [ ] Check responsive design on mobile/tablet/desktop
- [ ] Test all navigation links
- [ ] Verify contact form functionality
- [ ] Check image lazy loading
- [ ] Validate accessibility (ARIA labels, alt text)
- [ ] Test error handling and loading states

### ✅ Backend (Flask)
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Set environment variables:
  - [ ] `FLASK_ENV=production`
  - [ ] `SECRET_KEY` (unique, strong)
  - [ ] `DATABASE_URL` (PostgreSQL for production)
  - [ ] `ADMIN_TOKEN` (unique, strong)
- [ ] Run database migrations: `flask db upgrade`
- [ ] Load sample data: `python seed_data.py`
- [ ] Test all API endpoints
- [ ] Verify CORS settings
- [ ] Check error handling and logging
- [ ] Test admin authentication

### ✅ Environment Configuration
- [ ] Update branding config with real business info
- [ ] Replace placeholder images with actual photos
- [ ] Update contact information
- [ ] Set real social media URLs
- [ ] Configure domain name
- [ ] Set up SSL certificates

## Production Deployment

### 🚀 Frontend Deployment (Netlify/Vercel)

#### Netlify
1. Connect GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables:
   - `VITE_API_URL`: `https://your-backend-url.com/api`
4. Deploy and test

#### Vercel
1. Connect GitHub repository
2. Vercel auto-detects Vite/React
3. Set environment variable:
   - `VITE_API_URL`: `https://your-backend-url.com/api`
4. Deploy and test

### 🚀 Backend Deployment (Render/Fly.io)

#### Render
1. Create PostgreSQL database
2. Create web service:
   - Build command: `pip install -r requirements.txt`
   - Start command: `python run.py`
3. Set environment variables
4. Deploy and test

#### Fly.io
1. Install Fly CLI
2. Run: `fly launch`
3. Configure environment variables
4. Deploy: `fly deploy`

## Post-Deployment Verification

### 🔍 SEO & Performance
- [ ] Test Google PageSpeed Insights
- [ ] Verify meta titles and descriptions
- [ ] Check Open Graph tags
- [ ] Test structured data (Google Rich Results Test)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt accessibility

### 🔍 Functionality Testing
- [ ] Test all page loads
- [ ] Verify API connectivity
- [ ] Test contact form submission
- [ ] Check mobile responsiveness
- [ ] Test navigation menu
- [ ] Verify image loading
- [ ] Test error pages (404, 500)

### 🔍 Security & Monitoring
- [ ] Verify HTTPS is working
- [ ] Check CORS configuration
- [ ] Test admin authentication
- [ ] Set up monitoring/uptime checks
- [ ] Configure error logging
- [ ] Test database connections

## Ongoing Maintenance

### 📅 Regular Tasks
- **Weekly**: Check for dependency updates
- **Monthly**: Review analytics and performance
- **Quarterly**: Update content and images
- **Annually**: SSL certificate renewal

### 📊 Monitoring
- Set up Google Analytics
- Monitor error rates
- Track page load times
- Monitor API response times
- Set up uptime alerts

### 🔒 Security
- Regular dependency updates
- Security scan of dependencies
- Monitor for vulnerabilities
- Backup database regularly
- Review access logs

## Emergency Procedures

### 🚨 Site Down
1. Check deployment platform status
2. Review error logs
3. Verify database connectivity
4. Check recent deployments
5. Rollback if necessary

### 🚨 API Issues
1. Check backend logs
2. Verify database connection
3. Test endpoints manually
4. Check CORS settings
5. Restart backend service

### 🚨 Contact Form Issues
1. Check email configuration
2. Verify API endpoint
3. Test form submission
4. Check spam filters
5. Review error logs

## Contact Information

For deployment issues:
- Development Team: [Contact Info]
- Hosting Support: [Platform Support]
- Domain Registrar: [Registrar Info]

## Backup Strategy

### Database Backups
- **Daily**: Automated backups
- **Weekly**: Full backup verification
- **Monthly**: Offsite backup storage

### Code Backups
- Git repository (GitHub/GitLab)
- Branch protection for main
- Regular commits and tags

### Asset Backups
- Images and media files
- Configuration files
- Environment variables documentation

---

**Last Updated**: January 2024
**Version**: 1.0
