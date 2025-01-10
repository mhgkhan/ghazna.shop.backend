import nodemailer from "nodemailer"


export const transporterOpts = Object.freeze({
    host: process.env.HOST, port: process.env.PORT_SMTP, secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
    // true for 465, false for other ports auth: { user: process.env.SMTP_USER, // your Gmail email address pass: process.env.SMTP_PASS, // your Gmail password or app-specific password },
})

export const transporter = nodemailer.createTransport(transporterOpts)



export const sendMailing = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return true
    } catch (error) {
        return false
        // throw new Error(error.message)
    }
}