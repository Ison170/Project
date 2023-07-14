var slideIndex = 1;
showSlides(slideIndex);

function plusDivs(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}


// ---------------------------
// document.getElementById("contact-form").addEventListener("submit", function(event) {
  // document.getElementById("contact-form").addEventListener("submit", function(event) {
  //   event.preventDefault(); // Prevent form submission
  
  //   var emailInput = document.getElementById("email");
  //   var email = emailInput.value;
  
  //   // Regular expression for email validation
  //   var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  //   if (!emailRegex.test(email)) {
  //     alert("Invalid email format. Please enter a valid email.");
  //     emailInput.focus();
  //     return;
  //   }
  
  //   // Email is valid, continue with form submission or other actions
  //   // ...
  
  // });

// /*emsi;
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
    user: '4so19cs062.ison@sjec.ac.in',
    pass: 'ISON@1234',
  },
});

app.post('/contact', (req, res) => {
  const { email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'isonalwish@gmail.com',
    subject: `New Message from ${email}`,
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

app.get('/', (req, res) => {
  serveFile(res, 'index.html');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
  

