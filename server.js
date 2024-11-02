const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const authRoutes = require('./routes/authRoutes');
const serverRoutes = require('./routes/serverRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
const db = 'mongodb://localhost:27017/NodejsDB';
// const db = 'mongodb://blackbutler:*****@localhost:27017/NodejsDB';
mongoose.connect(db)
    .then((result) => console.log('connected database...'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// Middleware
app.use(express.static('styles'));
app.use(express.static('assets'));
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', authRoutes);
app.use('/', serverRoutes);

//token route
app.get('/verify/:token', (req, res)=>{ 
	const {token} = req.params; 

	// Verifying the JWT token 
	jwt.verify(token, 'ourSecretKey', function(err, decoded) { 
		if (err) { 
			console.log(err); 
			res.status(400).json({ error: "Email verification failed, possibly the link is     invalid or expired" });
		} 
		else { 
			res.status(200).json({ message: "Email verified successfully"});
		} 
	}); 
}); 

// About Page
app.get('/about-us', (req, res) => {
    res.render('aboutPage', { title: 'about-us-page' });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

// 404 Page
app.use((req, res) => {
    res.status(404).render('404Page');
});

app.listen(3000);
console.log('http://localhost:3000/home');