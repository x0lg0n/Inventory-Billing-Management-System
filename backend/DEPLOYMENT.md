# Render Deployment Configuration

## Environment Variables (Set in Render Dashboard)

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory_billing
JWT_SECRET=your_super_secure_production_jwt_secret_key_at_least_32_characters_long
JWT_EXPIRE=7d
```

## Render Build Commands

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
npm start
```

## Deployment Steps

### 1. Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create account or login
3. Create new cluster (free tier available)
4. Create database user with read/write permissions
5. Get connection string
6. Add your Render IP to network access (or allow all: 0.0.0.0/0)

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Inventory & Billing Management Backend"
git branch -M main
git remote add origin https://github.com/yourusername/inventory-billing-backend.git
git push -u origin main
```

### 3. Deploy to Render

1. Go to [Render](https://render.com/) and create account
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure service:
   - **Name**: inventory-billing-backend
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: npm start
   - **Instance Type**: Free (or paid for better performance)

### 4. Set Environment Variables

In Render dashboard, go to Environment tab and add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory_billing
JWT_SECRET=your_super_secure_production_jwt_secret_key_at_least_32_characters_long
JWT_EXPIRE=7d
```

### 5. Deploy

Click "Create Web Service" and wait for deployment to complete.

## Production URLs

Your API will be available at:
- **Base URL**: https://your-service-name.onrender.com
- **Health Check**: https://your-service-name.onrender.com/health
- **API Docs**: https://your-service-name.onrender.com/api/docs

## Production Security Notes

1. **JWT Secret**: Use a strong, random secret (at least 32 characters)
2. **Database**: Use MongoDB Atlas with IP whitelisting
3. **CORS**: Update CORS origins in production
4. **Rate Limiting**: Already configured for production
5. **HTTPS**: Render provides SSL/TLS certificates automatically

## Environment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with proper permissions
- [ ] Network access configured (IP whitelist or 0.0.0.0/0)
- [ ] GitHub repository created and code pushed
- [ ] Render service created and configured
- [ ] Environment variables set in Render
- [ ] Service deployed successfully
- [ ] Health check endpoint working
- [ ] API endpoints tested

## Monitoring

Monitor your application:
- **Render Logs**: Check deployment and runtime logs
- **Health Endpoint**: Monitor `/health` for uptime
- **MongoDB Atlas**: Monitor database performance
- **Error Tracking**: Check error logs for issues

## Scaling

For high traffic:
- Upgrade Render plan for more resources
- Implement database indexing
- Add Redis for caching
- Consider load balancing
- Monitor performance metrics