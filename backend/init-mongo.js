// MongoDB initialization script
db = db.getSiblingDB('inventory_billing');

// Create collections with indexes
db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ businessId: 1 });

db.createCollection('products');
db.products.createIndex({ businessId: 1, name: 1 });
db.products.createIndex({ businessId: 1, category: 1 });
db.products.createIndex({ businessId: 1, stock: 1 });
db.products.createIndex({ sku: 1 }, { sparse: true });

db.createCollection('contacts');
db.contacts.createIndex({ businessId: 1, type: 1 });
db.contacts.createIndex({ businessId: 1, name: 1 });
db.contacts.createIndex({ phone: 1 });
db.contacts.createIndex({ email: 1 }, { sparse: true });

db.createCollection('transactions');
db.transactions.createIndex({ businessId: 1, date: -1 });
db.transactions.createIndex({ businessId: 1, type: 1, date: -1 });
db.transactions.createIndex({ businessId: 1, customerId: 1 });
db.transactions.createIndex({ businessId: 1, vendorId: 1 });

print('Database initialization completed.');