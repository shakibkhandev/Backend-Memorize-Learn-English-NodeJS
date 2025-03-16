import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import logger from "../logger/winston.logger.js";

/**
 * Function to send email using Mailgen and Nodemailer
 * @param {Object} options - Email options containing recipient email, subject, and mailgen content
 * @param {string} options.email - Recipient's email
 * @param {string} options.subject - Email subject
 * @param {Object} options.mailgenContent - Mailgen content object
 */
export const sendEmail = async (options) => {
  // Initialize Mailgen instance with default theme and brand configuration
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Memorize Learn English",
      link: "https://apibookhub.vercel.app",
    },
  });

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  // Generate an HTML email with the provided contents
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  let transporter;

  if (process.env.NODE_ENV === "production") {
    // Create a Nodemailer transporter instance for production (Mailtrap)
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BASE_EMAIL,
        pass: process.env.BASE_EMAIL_PASSWORD,
      },
    });
  } else {
    // Use Mailhog for non-production environments
    transporter = nodemailer.createTransport({
      host: process.env.MAILHOG_SMTP_HOST,
      port: Number(process.env.MAILHOG_SMTP_PORT), // Ensure port is treated as a number
    });
  }

  const mail = {
    from: "memorize@gmail.com", // Sender's email
    to: options.email, // Receiver's email
    subject: options.subject, // Subject of the email
    text: emailTextual, // Text version of the email
    html: emailHtml, // HTML version of the email
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    // Fail silently rather than breaking the app
    logger.error(
      "Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file"
    );
    logger.error("Error: ", error);
  }
};

/**
 *
 * @param {string} username - The user's name
 * @param {string} verificationUrl - The URL for email verification
 * @returns {Object} - Mailgen content object
 * @description It designs the email verification mail
 */
export const emailVerificationMailgenContent = (name, verificationCode) => {
  return {
    body: {
      name: name || "Valued User", // Fallback if username is undefined
      intro: [
        "Thank you for joining our app!",
        "We’re thrilled to welcome you to our community.",
      ],
      action: {
        instructions: [
          "To verify your email address and activate your account,",
          "please enter the following 6-digit verification code in the app:",
        ],
        button: {
          color: "#1A73E8", // Changed to a professional blue color
          text: verificationCode,
        },
      },
      outro: [
        "This code will expire in 24 hours for security reasons.",
        "If you need assistance or didn’t request this code,",
        "please reply to this email or contact our support team.",
        "We’re here to help!",
      ],
      signature: "Best regards,\nThe Memorize Team", // Add your app name
    },
  };
};

export const forgetPasswordMailgenContent = (name, verificationCode) => {
  return {
    body: {
      name: name || "Valued User", // Fallback if name is undefined
      intro: [
        "We received a request to reset your password.",
        "No worries—we’re here to help you get back into your account!",
      ],
      action: {
        instructions: [
          "To reset your password, please enter the following 6-digit code",
          "in the app or on our website:",
        ],
        button: {
          color: "#1A73E8", // Professional blue color
          text: verificationCode,
        },
      },
      outro: [
        "This code will expire in 1 hour for security reasons.",
        "If you didn’t request a password reset, please ignore this email",
        "or contact our support team immediately.",
        "We’re here to assist you!",
      ],
      signature: "Best regards,\nThe Memorize Team",
    },
  };
};
