const multer = require('multer');
const path = require('path');
const User = require('../models/users');
const bcrypt = require('bcrypt');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 20MB
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files are allowed!'));
        }
        cb(null, true);
    }
});

module.exports.signup_get = (req, res) => {
    res.render('signupPage', { title: 'Sign Up' });
};

module.exports.signup_post = async (req, res, next) => {
    // Ensure `req.file` exists for image upload
    if (!req.file) {
        return res.status(400).send('Image upload is required.');
    }

    const { name, email, password, accountNumber } = req.body;
    const image = req.file.filename; // Get the uploaded image filename

    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user document
        const user = new User({
            name,
            image,
            email,
            password: hashedPassword ,
            accountNumber,
        });

        user.save()
            .then((result) => {
                console.log('User saved successfully:', result);
                res.redirect('/home'); 
            })
            .catch((err) => {
                console.error('Error saving user:', err);
                res.status(500).send('Error while saving user. Please try again.');
            });
    } catch (error) {
        next(error);
        console.error('Error processing request:', error);
        res.status(500).send('Error while processing request.');
    }
};

module.exports.login_get = (req, res) => {
    res.render('loginPage', { title: 'Login' });
};

module.exports.login_post = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1 hour'
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };

// Export multer upload to apply in routes if needed
module.exports.upload = upload;
