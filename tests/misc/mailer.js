const nodemailer = require('nodemailer');

module.exports = function (from, to, subject, text) {
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        secure: false, // SSL
    });
    const mailOptions = {
        from,
        to,
        subject,
        text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });
}
