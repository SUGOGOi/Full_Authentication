import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const smtpOptions = {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    secure: false, //true for 465, false for other ports
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
};
let transporter = nodemailer.createTransport(smtpOptions);
export default transporter;
