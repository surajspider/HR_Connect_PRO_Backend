const nodemailer = require('nodemailer');

const sendResetEmail = (email, resetToken) => {
    const transporter = nodemailer.createTransport({

    });

    const mailOptions = {
        from: 'your@email.com',
        to: email,
        subject: 'Password Reset',
        text: `To reset your password, click the following link: ${resetToken}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = { sendResetEmail };
