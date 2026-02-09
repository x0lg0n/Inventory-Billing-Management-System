const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

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
const sendEmail = async (to, subject, htmlContent, textContent = '') => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html: htmlContent,
      text: textContent || htmlContent.replace(/<[^>]*>/g, '')
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Send transaction created email
const sendTransactionCreatedEmail = async (userEmail, transactionData) => {
  const subject = `Transaction #${transactionData.invoiceNumber} Created`;
  
  const htmlContent = `
    <h2>New Transaction Created</h2>
    <p>Transaction Type: ${transactionData.type}</p>
    <p>Amount: ${transactionData.totalAmount}</p>
    <p>Date: ${new Date(transactionData.date).toLocaleDateString()}</p>
  `;

  return sendEmail(userEmail, subject, htmlContent);
};

// Send transaction status updated email
const sendTransactionStatusEmail = async (userEmail, transactionData, oldStatus, newStatus) => {
  const subject = `Transaction Status Updated: ${oldStatus} → ${newStatus}`;
  
  const htmlContent = `
    <h2>Transaction Status Changed</h2>
    <p>Transaction ID: ${transactionData._id}</p>
    <p>Previous Status: ${oldStatus}</p>
    <p>New Status: ${newStatus}</p>
    <p>Amount: ${transactionData.totalAmount}</p>
  `;

  return sendEmail(userEmail, subject, htmlContent);
};

module.exports = {
  sendEmail,
  sendTransactionCreatedEmail,
  sendTransactionStatusEmail
};