# Inventory & Billing Management Backend

A comprehensive backend system for small businesses to manage products, customers, vendors, transactions, and generate reports with JWT-based authentication.

## 🚀 Features

- **Authentication System**: JWT-based authentication with user registration, login, and profile management
- **Product Management**: Full CRUD operations with stock tracking, categories, and low-stock alerts
- **Contact Management**: Manage customers and vendors with detailed information and balance tracking
- **Transaction System**: Record sales and purchases with automatic stock updates and financial tracking
- **Reporting System**: Comprehensive reports for inventory, transactions, customers, and business dashboard
- **Security**: Rate limiting, input validation, password hashing, and business-level data isolation

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: express-validator
- **Logging**: Morgan

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd inventory-billing-backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/inventory_billing
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory_billing

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_replace_with_secure_random_string
JWT_EXPIRE=7d

# Business Configuration
DEFAULT_BUSINESS_ID=default_business_123
```

### 3. Run the Application

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All endpoints except registration and login require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "Password123",
  "businessId": "business_001"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith"
}
```

### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

### Logout
```http
GET /api/auth/logout
Authorization: Bearer <token>
```

## 📦 Product Management Endpoints

### Get All Products
```http
GET /api/products?search=laptop&category=electronics&page=1&limit=10
Authorization: Bearer <token>
```

### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "stock": 50,
  "category": "Electronics",
  "sku": "LAP001",
  "minStockLevel": 5
}
```

### Get Single Product
```http
GET /api/products/:id
Authorization: Bearer <token>
```

### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 1099.99,
  "stock": 45
}
```

### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Update Product Stock
```http
PATCH /api/products/:id/stock
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 10,
  "operation": "add"  // "add", "subtract", or "set"
}
```

### Get Low Stock Products
```http
GET /api/products/low-stock
Authorization: Bearer <token>
```

### Get Product Categories
```http
GET /api/products/categories
Authorization: Bearer <token>
```

### Get Products by Category
```http
GET /api/products/category/electronics
Authorization: Bearer <token>
```

## 👥 Contact Management Endpoints

### Get All Contacts
```http
GET /api/contacts?type=customer&search=john&page=1&limit=10
Authorization: Bearer <token>
```

### Create Contact
```http
POST /api/contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Customer",
  "phone": "+1234567890",
  "email": "john@customer.com",
  "type": "customer",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "creditLimit": 5000,
  "notes": "Premium customer"
}
```

### Get Single Contact
```http
GET /api/contacts/:id
Authorization: Bearer <token>
```

### Update Contact
```http
PUT /api/contacts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "creditLimit": 7500
}
```

### Delete Contact
```http
DELETE /api/contacts/:id
Authorization: Bearer <token>
```

### Get Customers Only
```http
GET /api/contacts/customers
Authorization: Bearer <token>
```

### Get Vendors Only
```http
GET /api/contacts/vendors
Authorization: Bearer <token>
```

### Search Contacts
```http
GET /api/contacts/search/john?type=customer&limit=5
Authorization: Bearer <token>
```

### Update Contact Balance
```http
PATCH /api/contacts/:id/balance
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 100,
  "operation": "add"  // "add", "subtract", or "set"
}
```

## 💰 Transaction Management Endpoints

### Get All Transactions
```http
GET /api/transactions?type=sale&startDate=2024-01-01&endDate=2024-01-31&page=1&limit=10
Authorization: Bearer <token>
```

### Create Transaction (Sale)
```http
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "sale",
  "customerId": "customer_id_here",
  "products": [
    {
      "productId": "product_id_here",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "paymentMethod": "cash",
  "notes": "Customer pickup"
}
```

### Create Transaction (Purchase)
```http
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "purchase",
  "vendorId": "vendor_id_here",
  "products": [
    {
      "productId": "product_id_here",
      "quantity": 50,
      "price": 800.00
    }
  ],
  "paymentMethod": "bank_transfer",
  "notes": "Bulk purchase"
}
```

### Get Single Transaction
```http
GET /api/transactions/:id
Authorization: Bearer <token>
```

### Get Sales Only
```http
GET /api/transactions/sales?customerId=customer_id&startDate=2024-01-01
Authorization: Bearer <token>
```

### Get Purchases Only
```http
GET /api/transactions/purchases?vendorId=vendor_id&startDate=2024-01-01
Authorization: Bearer <token>
```

### Get Transaction Summary
```http
GET /api/transactions/summary?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

### Update Transaction Status
```http
PATCH /api/transactions/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"  // "pending", "completed", "cancelled"
}
```

## 📊 Reporting Endpoints

### Dashboard Summary
```http
GET /api/reports/dashboard
Authorization: Bearer <token>
```

### Inventory Report
```http
GET /api/reports/inventory?category=electronics&lowStock=true&sortBy=stock&sortOrder=asc
Authorization: Bearer <token>
```

### Transaction Report
```http
GET /api/reports/transactions?startDate=2024-01-01&endDate=2024-01-31&type=sale&groupBy=day
Authorization: Bearer <token>
```

### Customer Report
```http
GET /api/reports/customer/:customerId?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

### Vendor Report
```http
GET /api/reports/vendor/:vendorId?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

## 🏥 Health & Status Endpoints

### Health Check
```http
GET /health
```

### API Documentation
```http
GET /api/docs
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Authentication Rate Limiting**: 10 auth requests per 15 minutes per IP
- **Password Hashing**: bcrypt with salt rounds
- **JWT Security**: Secure token generation and validation
- **Input Validation**: Comprehensive validation for all inputs
- **Business Isolation**: Users can only access their business data
- **CORS Protection**: Configurable CORS policies
- **Helmet Security**: Various security headers

## 📝 Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  businessId: String,
  role: String (admin|user),
  isActive: Boolean
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  businessId: String,
  sku: String,
  minStockLevel: Number,
  isActive: Boolean
}
```

### Contact Model
```javascript
{
  name: String,
  phone: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  type: String (customer|vendor),
  businessId: String,
  creditLimit: Number,
  currentBalance: Number,
  isActive: Boolean,
  notes: String
}
```

### Transaction Model
```javascript
{
  type: String (sale|purchase),
  customerId: ObjectId (for sales),
  vendorId: ObjectId (for purchases),
  products: [{
    productId: ObjectId,
    productName: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  totalAmount: Number,
  date: Date,
  businessId: String,
  status: String (pending|completed|cancelled),
  paymentMethod: String,
  notes: String,
  invoiceNumber: String
}
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory_billing
JWT_SECRET=your_production_secret_key_very_long_and_secure
JWT_EXPIRE=7d
```

### Deploy to Render

1. Push code to GitHub
2. Connect Render to your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy automatically on commits

### MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create cluster and database
3. Get connection string
4. Add to MONGODB_URI environment variable

## 🧪 Testing

### Manual Testing with curl

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test User","email":"test@example.com","password":"Password123","businessId":"test_business"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"Password123"}'

# Create product (use token from login)
curl -X POST http://localhost:5000/api/products \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \\
  -d '{"name":"Test Product","price":99.99,"stock":10,"category":"Test"}'
```

## 🐛 Common Issues & Solutions

### Database Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI format
- Verify network access for Atlas

### Authentication Issues
- Check JWT_SECRET is set
- Verify token format (Bearer token)
- Ensure token hasn't expired

### Validation Errors
- Check request body format
- Verify required fields
- Review field length limits

## 📞 Support

For issues and questions:
- Check the API documentation at `/api/docs`
- Review error messages in response
- Check server logs for detailed errors

## 📄 License

This project is licensed under the ISC License.

## 🔄 Version History

- **v1.0.0**: Initial release with full feature set

---

**Happy Coding! 🚀**