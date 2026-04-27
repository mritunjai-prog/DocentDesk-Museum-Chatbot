import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email options
  const message = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  // Send email
  await transporter.sendMail(message);
};

// Welcome email template
export const getWelcomeEmailTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .header h1 {
            color: #007bff;
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 20px 0;
          }
          .content p {
            margin: 10px 0;
          }
          .footer {
            text-align: center;
            border-top: 1px solid #ddd;
            padding-top: 20px;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
          .cta-button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .cta-button:hover {
            background-color: #0056b3;
          }
          .features-list {
            background-color: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #007bff;
            margin: 15px 0;
          }
          .features-list ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .features-list li {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to DocentDesk!</h1>
          </div>
          
          <div class="content">
            <p>Hi <strong>${userName}</strong>,</p>
            
            <p>Thank you for joining DocentDesk! We're excited to have you on board. Whether you're here to explore amazing artifacts, book tours, or chat with our AI, you're in the right place.</p>
            
            <div class="features-list">
              <p><strong>Here's what you can do:</strong></p>
              <ul>
                <li>📚 Explore our collection of artifacts</li>
                <li>🗓️ Book tours and events</li>
                <li>💬 Chat with our AI chatbot for insights</li>
                <li>⭐ Share your feedback and ratings</li>
                <li>🎯 Create your personalized profile</li>
              </ul>
            </div>
            
            <p>If you have any questions or need help getting started, don't hesitate to reach out. Our support team is here to assist you!</p>
            
            <div style="text-align: center;">
              <a href="${
                process.env.CLIENT_URL || "https://docentdesk.com"
              }" class="cta-button">Get Started Now</a>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2025 DocentDesk. All rights reserved.</p>
            <p>This is an automated message. Please do not reply directly to this email.</p>
            <p><a href="${
              process.env.CLIENT_URL || "https://docentdesk.com"
            }/support">Need help? Contact our support team</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export { sendEmail };
export default sendEmail;
