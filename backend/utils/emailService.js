import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendEmail = async ({to, subject, text, html}) => {
    try {
        const info = await transporter.sendMail({
            from: `"Pixel-Together Registration-Service" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        })

        console.log(`Email was successfully sent to user: ${info.messageId}`);
        
    } catch (error) {
        console.log("Error at sending Email:", error);
        throw new Error("Email could not be sent!")
        
    }
}

export default sendEmail;