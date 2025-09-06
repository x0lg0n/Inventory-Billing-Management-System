# 🚀 Inventory & Billing Management Frontend

A modern Next.js 15 frontend application built with shadcn/ui, TypeScript, and TailwindCSS for the Inventory & Billing Management System.

## 🌟 Features

- **Modern UI**: Built with shadcn/ui components and TailwindCSS
- **Authentication**: JWT-based authentication with login/register
- **Product Management**: Complete CRUD operations for inventory
- **Contact Management**: Manage customers and vendors
- **Transaction Processing**: Record sales and purchases with automatic stock updates
- **Dashboard Analytics**: Business overview with key metrics
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript implementation
- **Real-time Updates**: Automatic data synchronization

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: shadcn/ui (Radix UI + TailwindCSS)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see backend documentation)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install --legacy-peer-deps
```

### 2. Environment Setup
```bash
# Copy environment file
cp .env.example .env.local

# Update with your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page (redirects)
│   │   ├── login/             # Authentication pages
│   │   ├── register/
│   │   ├── dashboard/         # Main dashboard
│   │   ├── products/          # Product management
│   │   ├── contacts/          # Contact management
│   │   ├── transactions/      # Transaction management
│   │   └── reports/           # Reporting pages
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Layout.tsx        # Main layout with navigation
│   │   └── ProtectedRoute.tsx # Route protection
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx   # Authentication context
│   ├── lib/                  # Utilities
│   │   ├── api.ts           # API client
│   │   └── utils.ts         # Utility functions
│   └── types/               # TypeScript definitions
│       └── index.ts         # Type definitions
├── public/                  # Static assets
├── components.json         # shadcn/ui configuration
├── tailwind.config.js     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## 🔐 Authentication Flow

### Login Process
1. User enters email and password
2. Frontend sends credentials to `/api/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. User redirected to dashboard

### Protected Routes
- All routes except `/login` and `/register` require authentication
- `ProtectedRoute` component checks for valid token
- Automatic redirect to login if unauthorized

### Token Management
- JWT token stored in localStorage
- Automatic token inclusion in API requests
- Token expiration handling with redirect to login

## 📱 Pages & Features

### 🏠 Dashboard (`/dashboard`)
- **Overview Cards**: Products, customers, vendors, low stock alerts
- **Financial Summary**: Monthly sales, purchases, profit
- **Recent Activity**: Latest transactions and low stock products
- **Quick Navigation**: Easy access to all modules

### 📦 Products (`/products`)
- **Product List**: Searchable table with stock status
- **Add Product**: Form to create new products
- **Edit Product**: Update product information
- **Stock Management**: Track inventory levels
- **Categories**: Organize products by category
- **Low Stock Alerts**: Visual indicators for restocking

### 👥 Contacts (`/contacts`)
- **Unified Management**: Customers and vendors in one place
- **Tabbed Interface**: Separate views for customers/vendors
- **Contact Information**: Phone, email, address management
- **Credit Tracking**: Credit limits and current balances
- **Search & Filter**: Find contacts quickly

### 💰 Transactions (`/transactions`)
- **Sales Recording**: Process customer sales with stock reduction
- **Purchase Recording**: Record vendor purchases with stock increase
- **Transaction History**: Complete transaction log
- **Payment Methods**: Multiple payment options
- **Automatic Calculations**: Total amounts and stock updates

### 📊 Reports (`/reports`)
- **Inventory Reports**: Stock levels and low stock alerts
- **Financial Reports**: Sales, purchases, profit analysis
- **Customer Reports**: Customer transaction history
- **Vendor Reports**: Vendor transaction analysis
- **Date Filtering**: Custom date range analysis

## 🎨 UI Components

### Core Components (shadcn/ui)
- **Button**: Multiple variants and sizes
- **Input**: Form inputs with validation
- **Card**: Content containers
- **Table**: Data display with sorting
- **Badge**: Status indicators
- **Alert**: Error and success messages
- **Tabs**: Organized content sections
- **Dropdown**: Action menus

### Custom Components
- **Layout**: Main application layout with sidebar
- **ProtectedRoute**: Authentication guard
- **Navigation**: Responsive sidebar navigation

## 🔧 API Integration

### HTTP Client Configuration
```typescript
// Automatic token management
const apiClient = new ApiClient();

// Usage examples
const products = await apiClient.getProducts();
const transaction = await apiClient.createTransaction(data);
```

### Error Handling
- Global error interceptor
- Automatic token refresh handling
- User-friendly error messages
- Network error recovery

### Request/Response Flow
1. Component triggers API call
2. Request interceptor adds JWT token
3. API processes request
4. Response interceptor handles errors
5. Component updates UI with response

## 🎯 State Management

### Authentication Context
```typescript
const { user, login, logout, loading } = useAuth();
```

### Local State Patterns
- Form state with controlled components
- Loading states for async operations
- Error state management
- Optimistic UI updates

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Mobile Features
- Responsive navigation
- Touch-friendly interactions
- Optimized form layouts
- Condensed table views

## 🔒 Security Features

### Client-Side Security
- JWT token validation
- Protected route access control
- Input sanitization
- XSS protection

### Best Practices
- Environment variable usage
- Secure token storage
- API endpoint validation
- Error message sanitization

## 🚀 Deployment

### Vercel Deployment
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial frontend"
   git push origin main
   ```

2. **Connect to Vercel**
   - Import GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `.next`

3. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
   ```

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Dashboard data loading
- [ ] Product CRUD operations
- [ ] Contact management
- [ ] Transaction recording
- [ ] Report generation
- [ ] Mobile responsiveness

### API Testing
- Use browser developer tools
- Monitor network requests
- Verify error handling
- Test offline scenarios

## 📈 Performance Optimization

### Next.js Features
- **Automatic Code Splitting**: Route-based splitting
- **Image Optimization**: Next.js Image component
- **Static Generation**: Pre-built pages where possible
- **Server Components**: Reduced client bundle size

### Loading States
- Skeleton loaders for better UX
- Progressive data loading
- Optimistic UI updates
- Error boundaries

## 🎨 Customization

### Theme Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        // Custom colors here
      }
    }
  }
}
```

### Component Customization
- Modify shadcn/ui components in `components/ui/`
- Update theme variables in `globals.css`
- Add custom utility classes

## 🐛 Troubleshooting

### Common Issues

#### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### **API Connection Issues**
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check backend server is running
- Verify CORS configuration

#### **Authentication Problems**
- Clear localStorage: `localStorage.clear()`
- Check token expiration
- Verify backend JWT configuration

#### **Style Issues**
- Rebuild TailwindCSS: `npm run build`
- Check component imports
- Verify CSS variable definitions

## 📚 Resources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [TailwindCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Submit pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component documentation

---

## 🎉 **Frontend Complete!**

The Next.js 15 frontend provides a modern, responsive, and feature-rich interface for the Inventory & Billing Management System. With shadcn/ui components, TypeScript safety, and seamless API integration, it delivers an excellent user experience for small business management.

**🚀 Ready for production deployment!**