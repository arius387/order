const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, tel, email, order, quantity } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service (e.g., Gmail)
        auth: {
            user: 'your-email@gmail.com', // Your email address
            pass: 'your-email-password', // Your email password or app-specific password
        },
    });

    // Email content
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'lucky92will@gmail.com', // Recipient email address
        subject: 'New Order Received',
        text: `
            Name: ${name}
            Phone: ${tel}
            Email: ${email}
            Product: ${order}
            Quantity: ${quantity}
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Order submitted successfully!' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
