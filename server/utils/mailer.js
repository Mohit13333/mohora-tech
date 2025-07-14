// utils/mailer.js
import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email templates
const contactEmailTemplate = (data, isAdminCopy = false) => {
  const subject = isAdminCopy 
    ? `New Contact Form Submission: ${data.name || data.email}`
    : 'Thank you for contacting Mohora Technologies';

  const logoUrl = "https://res.cloudinary.com/mohitsingh8954/image/upload/v1738082749/Screenshot_2025-01-25_2034390_ouytfn.png";
  const companyName = "Mohora Technologies Pvt. Ltd.";
  const supportEmail = "support@mohoratechnologies.com";
  const websiteUrl = "https://mohoratechnologies.netlify.app/";
  const currentYear = new Date().getFullYear();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${subject}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          padding: 25px;
          text-align: center;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        }
        .logo {
          max-width: 180px;
          height: auto;
        }
        .content {
          padding: 25px;
        }
        .footer {
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
          background-color: #f5f5f5;
          border-top: 1px solid #eee;
        }
        .message-box {
          background-color: #f8fafc;
          border-left: 4px solid #3b82f6;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .details-table td {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        .details-table td:first-child {
          font-weight: bold;
          width: 30%;
          color: #555;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #3b82f6;
          color: white !important;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          margin: 15px 0;
        }
        h1 {
          color: #ffffff;
          margin: 10px 0 0;
          font-size: 22px;
        }
        h2 {
          color: #1e3a8a;
          margin-top: 0;
        }
        a {
          color: #3b82f6;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="${logoUrl}" alt="${companyName}" class="logo">
          <h1>${companyName}</h1>
        </div>
        
        <div class="content">
          <h2>${subject}</h2>
          
          ${isAdminCopy ? `
            <p>You have received a new contact form submission:</p>
            
            <table class="details-table">
              <tr>
                <td>Name:</td>
                <td>${data.name || 'Not provided'}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>${data.phoneNumber || 'Not provided'}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>${new Date().toLocaleString()}</td>
              </tr>
            </table>
            
            <div class="message-box">
              <strong>Message:</strong>
              <p>${data.message}</p>
            </div>
            
            <p>Please respond to this inquiry at your earliest convenience.</p>
            <a href="mailto:${data.email}" class="button">Reply to ${data.name?.split(' ')[0] || 'Customer'}</a>
          ` : `
            <p>Dear ${data.name || 'Customer'},</p>
            
            <p>Thank you for reaching out to ${companyName}. We have received your message and our team will review it shortly.</p>
            
            <p>Here's a summary of your submission:</p>
            
            <div class="message-box">
              <p>${data.message}</p>
            </div>
            
            <p>We typically respond within 24 hours. If your inquiry is urgent, please call our support team at <a href="tel:+919065269192">+91 9065269192</a>.</p>
            
            <p>For your reference, here are our contact details:</p>
            <table class="details-table">
              <tr>
                <td>Email:</td>
                <td><a href="mailto:${supportEmail}">${supportEmail}</a></td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td><a href="tel:+919065269192">+91 9065269192</a></td>
              </tr>
              <tr>
                <td>Business Hours:</td>
                <td>Mon-Fri, 9:00 AM - 6:00 PM IST</td>
              </tr>
            </table>
          `}
        </div>
        
        <div class="footer">
          <p>&copy; ${currentYear} ${companyName}. All rights reserved.</p>
          <p>
            <a href="${websiteUrl}">Visit our website</a> | 
            <a href="${websiteUrl}/privacy">Privacy Policy</a> | 
            <a href="mailto:${supportEmail}">Contact Support</a>
          </p>
          <p>
            ${companyName}, Registered Office: Andheri West, Mumbai, Maharashtra.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
};

// Enhanced send email function with better error handling
export const sendEmail = async (to, subject, html, attachments = []) => {
  try {
    const mailOptions = {
      from: `"Mohora Technologies" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
      attachments,
      headers: {
        'X-Company': 'Mohora Technologies Pvt. Ltd.',
        'X-Website': 'https://mohoratechnologies.netlify.app'
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} with message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error.message,
      details: {
        to,
        subject,
        errorCode: error.code
      }
    };
  }
};

export { contactEmailTemplate };