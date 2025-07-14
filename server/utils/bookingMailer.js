import nodemailer from 'nodemailer';

// Create transporter (can be shared with other mail services)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email templates for bookings
const bookingEmailTemplates = {
  customerConfirmation: (bookingData, serviceData) => {
    const subject = `Booking Confirmation for ${serviceData.title} - ${bookingData.customer.name}`;
    
    const logoUrl = "https://res.cloudinary.com/mohitsingh8954/image/upload/v1738082749/Screenshot_2025-01-25_2034390_ouytfn.png";
    const companyName = "Mohora Technologies Pvt. Ltd.";
    const supportEmail = "mohoratechnologiespvtltd@gmail.com";
    const websiteUrl = "https://mohoratechnologies.netlify.app";
    const currentYear = new Date().getFullYear();
    const bookingId = bookingData._id.toString().toUpperCase();

    return {
      subject,
      html: `
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
            .booking-summary {
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
            h3 {
              color: #1e40af;
              margin-bottom: 5px;
            }
            a {
              color: #3b82f6;
              text-decoration: none;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 8px;
              background-color: #dbeafe;
              color: #1e40af;
              border-radius: 4px;
              font-weight: bold;
              font-size: 0.9em;
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
              
              <p>Dear ${bookingData.customer.name},</p>
              
              <p>Thank you for booking with ${companyName}! We're excited to serve you.</p>
              
              <div class="booking-summary">
                <h3>Booking Summary</h3>
                <p>Your booking reference: <strong>#${bookingId}</strong></p>
                <span class="status-badge">CONFIRMED</span>
              </div>
              
              <table class="details-table">
                <tr>
                  <td>Service Booked:</td>
                  <td>${serviceData.title}</td>
                </tr>
                <tr>
                  <td>Booking Date:</td>
                  <td>${new Date(bookingData.createdAt).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td>Preferred Date:</td>
                  <td>${bookingData.bookingDetails.preferredDate ? new Date(bookingData.bookingDetails.preferredDate).toLocaleDateString() : 'To be scheduled'}</td>
                </tr>
                <tr>
                  <td>Budget:</td>
                  <td>₹${bookingData.bookingDetails.budget || 'To be determined'}</td>
                </tr>
                <tr>
                  <td>Special Requirements:</td>
                  <td>${bookingData.bookingDetails.specialRequirements || 'None'}</td>
                </tr>
              </table>
              
              <h3>Next Steps</h3>
              <ol>
                <li>Our team will review your booking within 24 hours.</li>
                <li>We'll contact you to confirm the schedule and finalize details.</li>
                <li>You'll receive a service agreement before work begins.</li>
              </ol>
              
              <p>If you have any questions about your booking, please contact us at <a href="mailto:${supportEmail}">${supportEmail}</a> or call <a href="tel:+919065269192">+91 9065269192</a>.</p>
              
              <a href="${websiteUrl}/bookings" class="button">View Your Bookings</a>
            </div>
            
            <div class="footer">
              <p>&copy; ${currentYear} ${companyName}. All rights reserved.</p>
              <p>
                <a href="${websiteUrl}">Visit our website</a> | 
                <a href="${websiteUrl}/privacy-policy">Privacy Policy</a> | 
                <a href="mailto:${supportEmail}">Contact Support</a>
              </p>
              <p>
                ${companyName}, Registered Office: Andheri West, Mumbai, Maharashtra.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  },

  adminNotification: (bookingData, serviceData) => {
    const subject = `New Booking: ${serviceData.title} - ${bookingData.customer.name}`;
    const bookingId = bookingData._id.toString().toUpperCase();

    return {
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${subject}</title>
          <style>
            /* Similar styles as customer confirmation, can be shared */
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
              color: white;
            }
            .content {
              padding: 25px;
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
            .priority-high {
              color: #dc2626;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New Booking Notification</h1>
            </div>
            
            <div class="content">
              <h2>${subject}</h2>
              
              <p>A new booking has been created in the system:</p>
              
              <table class="details-table">
                <tr>
                  <td>Booking ID:</td>
                  <td>#${bookingId}</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>${serviceData.title}</td>
                </tr>
                <tr>
                  <td>Customer:</td>
                  <td>${bookingData.customer.name}</td>
                </tr>
                <tr>
                  <td>Contact Email:</td>
                  <td><a href="mailto:${bookingData.customer.email}">${bookingData.customer.email}</a></td>
                </tr>
                <tr>
                  <td>Contact Phone:</td>
                  <td>${bookingData.customer.phone}</td>
                </tr>
                <tr>
                  <td>Budget:</td>
                  <td>₹${bookingData.bookingDetails.budget || 'Not specified'}</td>
                </tr>
                <tr>
                  <td>Preferred Date:</td>
                  <td>${bookingData.bookingDetails.preferredDate ? new Date(bookingData.bookingDetails.preferredDate).toLocaleDateString() : 'Not specified'}</td>
                </tr>
                <tr>
                  <td>Special Requirements:</td>
                  <td>${bookingData.bookingDetails.specialRequirements || 'None'}</td>
                </tr>
                <tr>
                  <td>Booking Date:</td>
                  <td>${new Date(bookingData.createdAt).toLocaleString()}</td>
                </tr>
              </table>
              
              <h3>Customer Message:</h3>
              <blockquote>${bookingData.bookingDetails.message || 'No additional message provided.'}</blockquote>
              
              <p>Please review this booking and contact the customer within 24 hours to confirm scheduling and next steps.</p>
              
              <a href="${process.env.ADMIN_DASHBOARD_URL}/bookings/${bookingData._id}" class="button">View Booking in Dashboard</a>
              
              <p class="priority-high">Action Required: Please respond to the customer promptly.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }
};

// Send booking confirmation to customer
export const sendBookingConfirmation = async (booking, service) => {
  try {
    const template = bookingEmailTemplates.customerConfirmation(booking, service);
    return await sendEmail(
      booking.customer.email,
      template.subject,
      template.html
    );
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    throw error;
  }
};

// Send booking notification to admin
export const sendBookingNotification = async (booking, service, adminEmail) => {
  try {
    const template = bookingEmailTemplates.adminNotification(booking, service);
    return await sendEmail(
      adminEmail,
      template.subject,
      template.html
    );
  } catch (error) {
    console.error('Error sending booking notification:', error);
    throw error;
  }
};

// Reuse the existing sendEmail function from mailer.js
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

export default bookingEmailTemplates;