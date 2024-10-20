
// controllers/authController.js
module.exports.signup_get = (req, res) => {
    res.render('signup', {title: 'Sign Up'});
};

module.exports.signup_post = (req, res) => {
    // Handle sign-up logic
    res.send('Sign Up form submitted');
};

module.exports.register_get = (req, res) => {
    res.render('register', {title: 'Register'});
};

module.exports.register_post = (req, res) => {
    // Handle register logic
    res.send('Register form submitted');
};

module.exports.login_get = (req, res) => {
    res.render('login', {title: 'Login'});
};

module.exports.login_post = (req, res) => {
    // Handle login logic
    res.send('Login form submitted');
};
