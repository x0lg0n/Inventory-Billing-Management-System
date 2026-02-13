# 📦 Inventory & Billing Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Build Status](https://github.com/x0lg0n/Inventory-Billing-Management-System/workflows/Build/badge.svg)](https://github.com/x0lg0n/Inventory-Billing-Management-System/actions)
[![Test Status](https://github.com/x0lg0n/Inventory-Billing-Management-System/workflows/Test/badge.svg)](https://github.com/x0lg0n/Inventory-Billing-Management-System/actions)
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-brightgreen.svg)](https://github.com/x0lg0n/Inventory-Billing-Management-System)

A comprehensive, modern inventory and billing management system designed for small to medium-sized businesses. Built with a powerful tech stack including Next.js 15, Node.js, Express, and MongoDB, this system provides a complete solution for managing products, customers, vendors, transactions, and generating insightful reports.

## ✨ Features

### Core Functionality

- **🔐 Authentication & Authorization**: Secure JWT-based authentication with role-based access control
- **📦 Product Management**: Complete CRUD operations for inventory items with stock tracking
- **👥 Contact Management**: Manage both customers and vendors in a unified system
- **💰 Transaction Processing**: Handle purchases and sales with automatic inventory updates
- **📊 Reporting & Analytics**: Real-time dashboards with sales trends, inventory status, and financial summaries
- **🌓 Dark Mode Support**: Modern UI with light/dark theme toggle
- **📱 Responsive Design**: Fully responsive interface that works on all devices

### Technical Features

- **⚡ Real-time Updates**: Instant inventory updates on transactions
- **🔒 Security First**: Helmet.js, CORS, rate limiting, and input validation
- **🐳 Docker Support**: Easy deployment with Docker and Docker Compose
- **📝 API Documentation**: Comprehensive Postman collection included
- **🎨 Modern UI**: Built with Shadcn/ui components and Tailwind CSS
- **🚀 Performance**: Optimized with Next.js 15 Turbopack

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet.js, bcrypt, express-rate-limit
- **Validation**: express-validator
- **Logging**: Morgan

### Frontend

- **Framework**: Next.js 15 with TypeScript
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Animations**: Framer Motion

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (v6.0 or higher) - Local or Atlas
- **Git** for version control
- **Docker** (optional, for containerized deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/x0lg0n/Inventory-Billing-Management-System.git
cd Inventory-Billing-Management-System
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your .env file with:
# - MongoDB connection string
# - JWT secret
# - Port configuration
# Edit .env with your preferred editor

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Configure your .env.local file with:
# - Backend API URL (default: http://localhost:5000)
# Edit .env.local with your preferred editor

# Start development server
npm run dev
```

### 4. Access the Application

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **API Documentation**: Import the Postman collection from `backend/Inventory_Billing_API.postman_collection.json`

## 🐳 Docker Deployment

For production deployment using Docker:

```bash
# Navigate to backend directory
cd backend

# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 📁 Project Structure

```folder
Inventory-Billing-Management-System/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app entry point
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   └── utils/             # Utility functions
│   ├── .env.example           # Environment variables template
│   ├── docker-compose.yml     # Docker compose configuration
│   ├── Dockerfile             # Docker image configuration
│   └── package.json           # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   ├── components/       # React components
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility libraries
│   │   ├── services/        # API service functions
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   ├── .env.example         # Frontend environment template
│   └── package.json         # Frontend dependencies
│
├── LICENSE                  # MIT License
├── README.md               # Project documentation
└── CONTRIBUTING.md         # Contribution guidelines
```

## 🔧 Configuration

### Backend Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/inventory_billing
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory_billing

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Application Settings
NEXT_PUBLIC_APP_NAME=Inventory & Billing System
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 📚 API Documentation

The API follows RESTful principles with the following main endpoints:

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Contacts

- `GET /api/contacts` - List all contacts
- `GET /api/contacts/:id` - Get contact details
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Transactions

- `GET /api/transactions` - List all transactions
- `GET /api/transactions/:id` - Get transaction details
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Reports

- `GET /api/reports/dashboard` - Dashboard statistics
- `GET /api/reports/sales` - Sales reports
- `GET /api/reports/inventory` - Inventory reports
- `GET /api/reports/financial` - Financial summaries

For detailed API documentation, import the Postman collection located at `backend/Inventory_Billing_API.postman_collection.json`.

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm test
```

### End-to-End Testing

```bash
# Run both frontend and backend
# Then run E2E tests
npm run test:e2e
```

## 🤝 Contributing

We welcome contributions from the community! Our project is designed to be beginner-friendly while offering opportunities for experienced developers.

**Start here**: [Contributing Guidelines](CONTRIBUTING.md) | [Roadmap](ROADMAP.md) | [Labels Guide](.github/LABELS.md)

### Finding Tasks to Work On

**New to the project?**

- Look for issues labeled `good-first-issue` - Perfect starter tasks
- Check `help-wanted` - Areas where we specifically need community help

**Want to work on the roadmap?**

- Filter by version: `v1.1.0`, `v1.2.0`, etc.
- Filter by area: `area: backend`, `area: frontend`, `area: database`, etc.
- Check by difficulty: `intermediate`, `advanced`

### How to Contribute

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** following our [commit guidelines](CONTRIBUTING.md)
4. **Add tests** for new features
5. **Push to the branch** (`git push origin feature/AmazingFeature`)
6. **Open a Pull Request** with a clear description

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features (use `pnpm test`)
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Use `pnpm` for package management (not npm)

### Getting Help During Development

- Need clarification? Start a [GitHub Discussion](https://github.com/x0lg0n/Inventory-Billing-Management-System/discussions)
- Found a blocker? Comment on the issue with details
- Questions about approach? Discuss in the issue before writing code

### Recognition

All contributors are recognized in [AUTHORS.md](AUTHORS.md) and the GitHub Contributors Graph. Your contributions help make this project better for everyone!

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please check the [existing issues](https://github.com/x0lg0n/Inventory-Billing-Management-System/issues) first, then feel free to [open a new issue](https://github.com/x0lg0n/Inventory-Billing-Management-System/issues/new).

### Issue Templates

We provide templates for:

- 🐛 Bug Reports
- ✨ Feature Requests
- 📚 Documentation Improvements
- 💬 Questions

## 📈 Roadmap

We maintain a detailed roadmap that outlines the future direction of the project and identifies opportunities for community contributions.

**View the full roadmap**: [ROADMAP.md](ROADMAP.md)

Key upcoming versions:

- **v1.1.0** (Q2 2026) - Enhanced testing, improved error handling, and API documentation
- **v1.2.0** (Q3 2026) - Performance optimization and advanced reporting
- **v2.0.0** (Q4 2026) - Multi-user support, permissions, and enterprise features
- **v2.1.0** (Q1 2027) - Mobile app and offline support
- **v3.0.0** (Future) - SaaS-ready features and advanced enterprise capabilities

Each version includes specific feature requests marked as **🤝 Help Wanted** - perfect opportunities for contributors!

## 👥 Team

The project is maintained by a dedicated team of volunteers. For the full list of maintainers and how to get involved, see [MAINTAINERS.md](MAINTAINERS.md).

**Project Lead**: [Siddhartha Kunwar](https://github.com/x0lg0n)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Documentation

Learn more about the project through our comprehensive documentation:

### Community & Contributing

- [CONTRIBUTING.md](CONTRIBUTING.md) - Guidelines for contributing to the project
- [ROADMAP.md](ROADMAP.md) - Project roadmap with version planning and contribution opportunities
- [MAINTAINERS.md](MAINTAINERS.md) - Active maintainers and how to become one
- [AUTHORS.md](AUTHORS.md) - Project creators and contributors
- [.github/LABELS.md](.github/LABELS.md) - GitHub label system and how to use them

### Project Information

- [README.md](README.md) - Main project documentation
- [CHANGELOG.md](CHANGELOG.md) - Version history and changes
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Community standards and expectations
- [GOVERNANCE.md](GOVERNANCE.md) - Project governance model
- [SECURITY.md](SECURITY.md) - Security policies and vulnerability reporting
- [SUPPORT.md](SUPPORT.md) - How to get help and support

### Deployment & Setup

- [backend/README.md](backend/README.md) - Backend-specific documentation
- [frontend/README.md](frontend/README.md) - Frontend-specific documentation
- [DEPLOYMENT.md](backend/DEPLOYMENT.md) - Deployment instructions
- [QUICK_START.md](backend/QUICK_START.md) - Quick start guide

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries
- Inspired by modern inventory management best practices

## 💬 Support

For support, please:

1. Check our [Support Documentation](SUPPORT.md)
2. Search [existing issues](https://github.com/x0lg0n/Inventory-Billing-Management-System/issues)
3. Start a [GitHub Discussion](https://github.com/x0lg0n/Inventory-Billing-Management-System/discussions)
4. Review the [Contributing Guidelines](CONTRIBUTING.md) if you want to contribute

---

<p align="center">
  Made with ❤️ by the community
</p>
