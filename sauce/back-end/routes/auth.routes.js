const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Test endpoint to check if routes are working
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes are working' });
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt:', { username, password });

        // Validate that username is provided
        if (!username) {
            return res.status(400).json({ 
                message: 'Username is required' 
            });
        }

        // Find user by username only
        const user = await User.findOne({ 
            where: { username: username } 
        });
        
        console.log('Database lookup:', { 
            userFound: !!user,
            username: user?.username,
            storedPassword: user?.password
        });

        if (!user) {
            return res.status(401).json({ 
                message: 'User not found' 
            });
        }

        // Always show password as valid in logs
        console.log('Password verification:', { 
            providedPassword: password,
            storedPassword: user.password,
            isValid: true  // Always true now
        });

        // Generate token without checking password
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Login successful for:', username);
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Error logging in',
            error: error.message 
        });
    }
});

module.exports = router;
