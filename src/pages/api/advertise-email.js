// pages/api/advertise-email.js (for Pages Router)
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      name,
      company,
      designation,
      address,
      contactNo,
      email,
      advertisementQuery,
    } = req.body;

    // Basic validation
    if (
      !name ||
      !company ||
      !designation ||
      !address ||
      !contactNo ||
      !email ||
      !advertisementQuery
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Contact number validation
    const contactRegex = /^\d{1,10}$/;
    if (!contactRegex.test(contactNo)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid contact number",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"CSR Voice Advertisement Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Advertisement Inquiry from ${name} - ${company}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1877f2; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; padding: 10px; background-color: white; border-left: 4px solid #1877f2; }
            .field strong { color: #1877f2; }
            .query { background-color: white; padding: 15px; border: 1px solid #ddd; border-radius: 5px; margin-top: 10px; }
            .footer { background-color: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
            .highlight { background-color: #fffbf0; padding: 10px; border-radius: 5px; border-left: 4px solid #ff9800; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Advertisement Inquiry</h1>
            </div>
            <div class="content">
              <div class="highlight">
                <strong>📢 Advertisement Request - Requires Immediate Attention</strong>
              </div>
              
              <div class="field">
                <strong>Contact Person:</strong> ${name}
              </div>
              <div class="field">
                <strong>Company/Organization:</strong> ${company}
              </div>
              <div class="field">
                <strong>Designation:</strong> ${designation}
              </div>
              <div class="field">
                <strong>Address:</strong> ${address}
              </div>
              <div class="field">
                <strong>Contact Number:</strong> ${contactNo}
              </div>
              <div class="field">
                <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <strong>Advertisement Requirements:</strong>
                <div class="query">${advertisementQuery.replace(
                  /\n/g,
                  "<br>"
                )}</div>
              </div>
              <div class="field">
                <strong>Inquiry Received on:</strong> ${new Date().toLocaleString(
                  "en-IN",
                  {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                )} IST
              </div>
            </div>
            <div class="footer">
              <p>This inquiry was submitted through the CSR Voice Advertisement Form.</p>
              <p>Please respond with advertisement tariff details and availability.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text version as fallback
      text: `
        New Advertisement Inquiry
        
        Contact Person: ${name}
        Company/Organization: ${company}
        Designation: ${designation}
        Address: ${address}
        Contact Number: ${contactNo}
        Email: ${email}
        
        Advertisement Requirements:
        ${advertisementQuery}
        
        Inquiry Received on: ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })} IST
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message:
        "Your advertisement inquiry has been submitted successfully! We'll send you our tariff details within 24-48 hours.",
    });
  } catch (error) {
    console.error("Error sending advertisement inquiry email:", error);

    // More specific error messages
    if (error.code === "EAUTH") {
      res.status(500).json({
        success: false,
        message: "Email authentication failed. Please contact support.",
      });
    } else if (error.code === "ENOTFOUND") {
      res.status(500).json({
        success: false,
        message: "Network error. Please check your connection and try again.",
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          "Failed to send advertisement inquiry. Please try again later.",
      });
    }
  }
}
