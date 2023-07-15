require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.get('/', (req, res) => {
  serveFile(res, 'index.html');
});

app.get('/success', (req, res) => {
  serveFile(res, 'success.html');
});

app.post('/index', (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'isonalwish@gmail.com',
    subject: `New Message from ${name}`,
    text: `Email: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/success');
    }
  });
});

const serveFile = (res, filename) => {
  res.sendFile(path.join(__dirname, filename));
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
