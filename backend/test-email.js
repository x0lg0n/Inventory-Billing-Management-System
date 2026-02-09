require('dotenv').config();
const { sendTransactionCreatedEmail } = require('./src/services/emailService');

const testEmail = async () => {
  try {
    await sendTransactionCreatedEmail('youremail@gmail.com', {
      _id: '123',
      type: 'sale',
      totalAmount: 1000,
      date: new Date(),
      invoiceNumber: 'INV-001'
    });
    console.log('✅ Test email sent successfully!');
  } catch (error) {
    console.error('❌ Email error:', error.message);
  }
};

testEmail();