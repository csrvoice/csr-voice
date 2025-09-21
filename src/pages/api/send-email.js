// pages/api/send-email.js (for Pages Router)
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, company, designation, contactNo, email, remarks } = req.body;

    // Basic validation
    if (!name || !company || !designation || !contactNo || !email || !remarks) {
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
      from: `"CSR Voice Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name} - ${company}`,
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
            .remarks { background-color: white; padding: 15px; border: 1px solid #ddd; border-radius: 5px; margin-top: 10px; }
            .footer { background-color: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <strong>Name:</strong> ${name}
              </div>
              <div class="field">
                <strong>Company:</strong> ${company}
              </div>
              <div class="field">
                <strong>Designation:</strong> ${designation}
              </div>
              <div class="field">
                <strong>Contact Number:</strong> ${contactNo}
              </div>
              <div class="field">
                <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <strong>Message/Remarks:</strong>
                <div class="remarks">${remarks.replace(/\n/g, "<br>")}</div>
              </div>
              <div class="field">
                <strong>Submitted on:</strong> ${new Date().toLocaleString(
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
              <p>This email was sent from the CSR Voice contact form.</p>
              <p>Please reply directly to this email to contact the sender.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text version as fallback
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Company: ${company}
        Designation: ${designation}
        Contact Number: ${contactNo}
        Email: ${email}
        
        Message/Remarks:
        ${remarks}
        
        Submitted on: ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })} IST
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Optional: Send a confirmation email to the user
    const confirmationMailOptions = {
      from: `"CSR Voice" <${process.env.EMAIL_USER}>`,
      to: email,
      subject:
        "Thank you for contacting CSR Voice - We've received your message",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1877f2; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { background-color: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for reaching out to CSR Voice. We have successfully received your message and our team will get back to you as soon as possible.</p>
              <p><strong>Your submission details:</strong></p>
              <ul>
                <li><strong>Company:</strong> ${company}</li>
                <li><strong>Designation:</strong> ${designation}</li>
                <li><strong>Contact Number:</strong> ${contactNo}</li>
                <li><strong>Submitted on:</strong> ${new Date().toLocaleString(
                  "en-IN",
                  { timeZone: "Asia/Kolkata" }
                )} IST</li>
              </ul>
              <p>In the meantime, if you have any urgent questions, feel free to reach us directly at <a href="mailto:hello@csrvoice.com">hello@csrvoice.com</a>.</p>
              <p>Best regards,<br>CSR Voice Team</p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email from CSR Voice.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send confirmation email (optional - wrap in try-catch to not fail the main process)
    try {
      await transporter.sendMail(confirmationMailOptions);
    } catch (confirmationError) {
      console.warn("Failed to send confirmation email:", confirmationError);
      // Don't fail the main request if confirmation email fails
    }

    res.status(200).json({
      success: true,
      message: "Email sent successfully! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Error sending email:", error);

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
        message: "Failed to send email. Please try again later.",
      });
    }
  }
}
