const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const NotificationHistory = require('../models/NotificationHistory');

// Validate SMTP configuration
const validateSMTPConfig = () => {
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM_EMAIL'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required SMTP environment variables: ${missingVars.join(', ')}`);
  }
};

// Helper function to escape HTML content
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
};

// Validate SMTP config on module load
validateSMTPConfig();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email transporter ready');
  }
});

// Send email function
const sendEmail = async (to, subject, htmlContent, textContent = '', notificationData = {}) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html: htmlContent,
      text: textContent || htmlContent.replace(/<[^>]*>/g, '')
    });

    // Log successful notification to history
    if (notificationData.userId && notificationData.businessId) {
      await NotificationHistory.create({
        userId: notificationData.userId,
        businessId: notificationData.businessId,
        email: to,
        type: notificationData.type || 'transaction_created',
        subject,
        status: 'sent',
        transactionId: notificationData.transactionId
      }).catch(error => {
        console.error('Error logging notification history:', error);
      });
    }

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    
    // Log failed notification to history
    if (notificationData.userId && notificationData.businessId) {
      await NotificationHistory.create({
        userId: notificationData.userId,
        businessId: notificationData.businessId,
        email: to,
        type: notificationData.type || 'transaction_created',
        subject,
        status: 'failed',
        error: error.message,
        transactionId: notificationData.transactionId
      }).catch(historyError => {
        console.error('Error logging failed notification history:', historyError);
      });
    }
    
    throw error;
  }
};

// Send transaction created email
const sendTransactionCreatedEmail = async (userEmail, transactionData, notificationData = {}) => {
  const subject = `Transaction #${escapeHtml(String(transactionData.invoiceNumber))} Created`;
  
  const htmlContent = `
    <h2>New Transaction Created</h2>
    <p>Transaction Type: ${escapeHtml(String(transactionData.type))}</p>
    <p>Amount: ${escapeHtml(String(transactionData.totalAmount))}</p>
    <p>Date: ${new Date(transactionData.date).toLocaleDateString()}</p>
  `;

  return sendEmail(userEmail, subject, htmlContent, '', {
    ...notificationData,
    type: 'transaction_created',
    transactionId: transactionData._id
  });
};

// Send transaction status updated email
const sendTransactionStatusEmail = async (userEmail, transactionData, oldStatus, newStatus, notificationData = {}) => {
  const subject = `Transaction Status Updated: ${escapeHtml(oldStatus)} → ${escapeHtml(newStatus)}`;
  
  const htmlContent = `
    <h2>Transaction Status Changed</h2>
    <p>Transaction ID: ${escapeHtml(String(transactionData._id))}</p>
    <p>Previous Status: ${escapeHtml(oldStatus)}</p>
    <p>New Status: ${escapeHtml(newStatus)}</p>
    <p>Amount: ${escapeHtml(String(transactionData.totalAmount))}</p>
  `;

  return sendEmail(userEmail, subject, htmlContent, '', {
    ...notificationData,
    type: 'transaction_updated',
    transactionId: transactionData._id
  });
};

module.exports = {
  sendEmail,
  sendTransactionCreatedEmail,
  sendTransactionStatusEmail
};