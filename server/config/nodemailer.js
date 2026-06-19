import { createTransport } from 'nodemailer'
// Create a transporter using SMTP
const transporter = ({
     host: "smtp-relay.brevo.com",
     port: 587,
     auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
     },
});

const sendEmail = async ({ to, subject, body }) => {
     const response = await transporter.sendEmail({
          from: process.env.SENDER_EMAIL,
          to,
          html:body
     })
     return response;
}
export default sendEmail