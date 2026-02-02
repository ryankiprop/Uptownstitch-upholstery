# Deployment Integration Guide

## Current Status
- ✅ Backend deployed on Render: https://uptownstitch-upholstery.onrender.com
- ✅ Frontend deployed on Vercel: https://uptownstitch-upholstery.vercel.app

## Issue: Backend Database is Empty

The Render backend needs to be initialized with seed data. Follow these steps:

### Option 1: Use Vercel's Edge Function or Backend Shell (Recommended)

Since Render runs on ephemeral filesystems, you need to seed the database persistently. The best approach is to use a **POST endpoint** to create products.

### Option 2: Add a `/seed` Admin Endpoint (Quick Fix)

Create a protected `/api/admin/seed` endpoint that initializes the database when called.

## Frontend Configuration

### 1. Set Environment Variable in Vercel

Add this environment variable in Vercel project settings:

```
VITE_API_URL=https://uptownstitch-upholstery.onrender.com
```

**Important**: Do NOT include `/api` at the end. The LazyImage component will:
- Use this URL for API calls: `https://uptownstitch-upholstery.onrender.com/api/products`
- Strip `/api` for image serving: `https://uptownstitch-upholstery.onrender.com/uploads/product_N.jpg`

### 2. Trigger Vercel Rebuild

After setting the environment variable, click "Redeploy" in Vercel to rebuild the frontend with the new URL.

## Next Steps

1. **Seed the backend database** with products
2. **Configure VITE_API_URL** in Vercel
3. **Test the integration**
