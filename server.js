const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import Nodemailer

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail or any other mail service
    auth: {
        user: 'ketanpandagre11@gmail.com', // Your email
        pass: 'Ketan@1112'   // Your email password
    }
});

// Function to send email notification
function sendEmailNotification(to, subject, text) {
    const mailOptions = {
        from: 'ketanpandagre11@gmail.com',  // Sender address
        to,                            // Receiver's email
        subject,                       // Subject of the email
        text                           // Email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
}

// Route to handle requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the SOS Backend Service!');
});

// POST endpoint to receive SOS location data
app.post('/api/send-sos', (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    // Log the SOS data
    console.log(`SOS data received: Latitude ${latitude}, Longitude ${longitude}`);

    // Compose email content
    const emailText = `An SOS signal has been triggered. The person is located at:
        Latitude: ${latitude},
        Longitude: ${longitude}
    Please respond as soon as possible.`;

    // Send email to authorities and volunteers (add their emails here)
    const authoritiesEmail = 'deepanshupandagre0@gmail.com';
    const volunteerEmail = 'kusumpandagre576@gmail.com';

    // Send notifications
    sendEmailNotification(authoritiesEmail, 'SOS Alert: Immediate Action Required', emailText);
    sendEmailNotification(volunteerEmail, 'Volunteer Alert: SOS Signal', emailText);

    // Respond to the client
    res.status(200).json({ message: 'SOS data received, authorities and volunteers notified.' });
});

// Start the server
app.listen(port, () => {
    console.log(`SOS backend service running at http://localhost:${port}`);
});
