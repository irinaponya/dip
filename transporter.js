const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: "iponyatova57@mail.ru",
        pass: "CfmW5w3njaMB4kXqUgRb"
    }
});


module.exports = transporter;