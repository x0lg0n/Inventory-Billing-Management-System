// User types
export interface User {
  id: string;
  name: string;
  email: string;
  businessId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  businessId: string;
}

// Product types
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  sku?: string;
  minStockLevel: number;
  businessId: string;
  isActive: boolean;
  isLowStock?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  sku?: string;
  minStockLevel?: number;
}

// Contact types
export interface Contact {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  type: 'customer' | 'vendor';
  businessId: string;
  creditLimit: number;
  currentBalance: number;
  isActive: boolean;
  notes?: string;
  fullAddress?: string;
  contactInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactData {
  name: string;
  phone: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  type: 'customer' | 'vendor';
  creditLimit?: number;
  notes?: string;
}

// Transaction types
export interface TransactionItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Transaction {
  _id: string;
  type: 'sale' | 'purchase';
  customerId?: string;
  customerName?: string;
  vendorId?: string;
  vendorName?: string;
  products: TransactionItem[];
  totalAmount: number;
  date: string;
  businessId: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'credit' | 'other';
  notes?: string;
  invoiceNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionData {
  type: 'sale' | 'purchase';
  customerId?: string;
  vendorId?: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod?: string;
  notes?: string;
}

// Report types
export interface DashboardSummary {
  overview: {
    totalProducts: number;
    totalCustomers: number;
    totalVendors: number;
    lowStockProductsCount: number;
  };
  monthly: {
    sales: number;
    purchases: number;
    profit: number;
    transactionCount: number;
  };
  yearly: {
    sales: number;
    purchases: number;
    profit: number;
    transactionCount: number;
  };
  lowStockProducts: Product[];
  recentTransactions: Transaction[];
}

export interface InventoryReport {
  products: Product[];
  statistics: {
    totalProducts: number;
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
    categories: number;
  };
  lowStockProducts: Product[];
  outOfStockProducts: Product[];
  categoryBreakdown: Record<string, {
    count: number;
    totalStock: number;
    totalValue: number;
  }>;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    limit: number;
  };
}

// Email preferences types
export interface EmailPreferencesData {
  transactionCreated?: boolean;
  transactionUpdated?: boolean;
  lowStockAlert?: boolean;
  dailyReport?: boolean;
}

export interface EmailPreferences extends EmailPreferencesData {
  _id?: string;
  userId?: string;
  businessId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}