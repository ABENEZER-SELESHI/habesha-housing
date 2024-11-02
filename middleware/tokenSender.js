const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken'); 

const transporter = nodemailer.createTransport({ 
	host: secure_configuration.HOST,
            port: secure_configuration.PORT,
	auth: { 
		user: secure_configuration.EMAIL_USERNAME, 
		pass: secure_configuration.PASSWORD 
	} 
}); 

const token = jwt.sign({
    data: 'your-data' // your payload here
}, 'yourSecretKey', { expiresIn: '1h' }); 

const mailConfigurations = { 

	// It should be a string of sender/server email 
	from: 'ebenezerseleshi@gmail.com', 

	to: 'djuric.eth@gmail.com', 

	subject: 'Email Verification', 
	
	text: `Hi there, you have recently entered your 
		email on Habesha Homes website for sign up. 

		Please follow the given link to verify your email,
        if you want to continue with the sign up
		http://localhost:3000/verify/${token} 

		Thanks` 
	
}; 

transporter.sendMail(mailConfigurations, function(error, info){ 
	if (error) throw Error(error); 
	console.log('Email Sent Successfully'); 
	console.log(info); 
});