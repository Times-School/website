const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    const formData = req.body;

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'timesschoollc@gmail.com',
            pass: 'iaky jacs yzof qpzx' // Use the generated app password here
        }
    });

    const mailOptions = {
        from: 'timesschoollc@gmail.com',
        to: 'timesschoollc@gmail.com', // Emailing to yourself
        subject: 'New Demo Lesson Request',
        text: `Name: ${formData.name}\nPhone: ${formData.phone}\nCourse: ${formData.course}\nPreferred Time: ${formData.preferred_time}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.redirect('/thank-you.html');
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
