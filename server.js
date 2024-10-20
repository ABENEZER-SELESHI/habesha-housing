const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const serverRoutes = require('./routes/serverRoutes');

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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', authRoutes);
app.use('/', serverRoutes);

// About Page
app.get('/about-us', (req, res) => {
    res.render('aboutPage', { title: 'about-us-page' });
});

// 404 Page
app.use((req, res) => {
    res.status(404).render('404Page');
});

app.listen(3000);
console.log('http://localhost:3000');
