# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local installation OR MongoDB Atlas account)

## 1. Install Dependencies
```bash
npm install
```

## 2. Setup Database

### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service: `mongod`

### Option B: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create free cluster
3. Get connection string
4. Update `.env` file with your connection string

## 3. Environment Setup
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your settings
# For MongoDB Atlas, update MONGODB_URI
# For production, change JWT_SECRET
```

## 4. Start Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 5. Test API
```bash
# Health check
curl http://localhost:5000/health

# API documentation
curl http://localhost:5000/api/docs

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Password123","businessId":"test_business"}'
```

## 6. Import Postman Collection
1. Open Postman
2. Import `Inventory_Billing_API.postman_collection.json`
3. Import `Inventory_Billing.postman_environment.json`
4. Start testing all endpoints!

## 7. Deploy to Production
See `DEPLOYMENT.md` for detailed deployment instructions to Render.

---

**🎉 You're ready to go!**