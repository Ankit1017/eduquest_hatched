const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// import jwt from 'express-jwt';
const User = require('../models/User');

const router = express.Router();

// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://your-domain.auth0.com/.well-known/jwks.json`
//   }),
//   audience: 'your-api-audience',
//   issuer: `https://your-domain.auth0.com/`,
//   algorithms: ['RS256']
// });


router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("hitted")
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
        res.json({ token, isAdmin: user.isAdmin , _id: user._id,username});
    } catch (err) {
        res.status(500).json({ message: "pip" });
    }
});


router.post('/sync-user', async (req, res) => {
    const { id, email, name, role, classList } = req.body;

    // Validate required fields
    if (!id || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: id or email'
      });
    }

    // Validate role
    const validRoles = ['student', 'teacher', 'admin'];
    const userRole = validRoles.includes(role) ? role : 'student';


    // Find or create user using clerkId as unique identifier
    try {
        // Try to find existing user
        let user = await User.findOne({ clerkId:id });

        if (user) {
          return res.status(200).json({ user, message: 'User already exists' });
        }

        // Create new user
        user = new User({
          clerkId:id,
          email,
          name,
          userRole,
          classList
        });

        await user.save();

        return res.status(201).json({ user, message: 'User created successfully' });

      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
});


module.exports = router;
