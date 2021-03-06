const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', [
    //Validate the requested user
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // See if the user exists
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            });
        }

        // Get user's gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm' //default image if no avatar present
        })

        user = new User({
            name,
            email,
            password,
            avatar
        })

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to database
        user = await user.save();

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar
                    },
                    token: token
                })
            }
        )
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }


})

module.exports = router;
