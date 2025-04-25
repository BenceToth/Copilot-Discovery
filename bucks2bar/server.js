const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the "bucks2bar" directory
app.use(express.static(path.join(__dirname, '../bucks2bar')));

// Route to serve the main index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../bucks2bar/index.html'));
});

// Email sending route
app.post('/send-email', async (req, res) => {
    const { email, chartImage } = req.body;

    if (!email || !chartImage) {
        return res.status(400).json({ error: 'Email and chart image are required.' });
    }

    try {
        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email provider (e.g., Gmail, Outlook, etc.)
            auth: {
                user: 'your-email@gmail.com', // Replace with your email
                pass: 'your-email-password', // Replace with your email password or app-specific password
            },
        });

        // Email options
        const mailOptions = {
            from: 'your-email@gmail.com', // Sender address
            to: email, // Recipient address
            subject: 'Your Chart Image',
            text: 'Here is your chart image.',
            attachments: [
                {
                    filename: 'chart.png',
                    content: chartImage.split('base64,')[1], // Extract Base64 content
                    encoding: 'base64',
                },
            ],
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

// Endpoint to return dummy data for income and expenses
app.get('/get-dummy-data', (req, res) => {
    const dummyData = {
        income: [1000, 950, 900, 850, 950, 900, 950, 1000, 950, 900, 950, 1000],
        expenses: [800, 700, 600, 650, 700, 700, 750, 800, 700, 650, 700, 800]
    };
    res.status(200).json(dummyData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});