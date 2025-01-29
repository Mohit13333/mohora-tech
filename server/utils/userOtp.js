import nodemailer from "nodemailer";
import "dotenv/config";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const sendMail = async function ({ to, subject, text, html }) {
  let info = await transporter.sendMail({
    from: `"Mohora Technologies Pvt Ltd." <${process.env.EMAIL}>`,
    to,
    subject,
    text,
    html,
  });
  return info;
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
export const AuthOtp = async ({ to }) => {
  const otp = generateOTP();

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #4CAF50; text-align: center;">Your OTP Code</h2>
      <p style="text-align: center;">Use the following One Time Password (OTP) to complete your action. This OTP is valid for 10 minutes.</p>
      <div style="text-align: center; font-size: 28px; font-weight: bold; color: #4CAF50; margin: 20px 0; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
        ${otp}
      </div>
      <p style="text-align: center;">If you did not request this, please ignore this email.</p>
      <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #777;">
        Thanks,<br/>
        <strong>Mohora Technologies Pvt Ltd</strong>
      </p>
      <div style="text-align: center; margin-top: 30px;">
        <img src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738082749/Screenshot_2025-01-25_2034390_ouytfn.png" alt="Mohora Technologies Logo" style="width: 180px; height: auto; border-radius: 4px;"/>
      </div>
    </div>
  `;

  const info = await sendMail({
    to,
    subject: "Your OTP Code from Mohora Technologies",
    text: `Your OTP is: ${otp}`,
    html,
  });

  return { info, otp };
};
