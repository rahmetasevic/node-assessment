const User = require('../models/User');
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;

    if(!email || !password || !firstName || !lastName || !phone) {
        return res.status(400).json({ message: 'All user credentials(email, password, firstName, lastName, phone) are mandatory!' });
    }

    const availableUser = await User.findOne({email});
    if(availableUser) {
        return res.status(409).json({ message: 'There is already a registered user with that email adress!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
       email,
       password: hashedPassword,
       firstName,
       lastName,
       phone
    });

    if(user) {
        res.status(201).json({ message: `New user ${user} created!` });
    } else {
        res.status(400).json({ message: 'User data is not valid!' });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({ message: 'Both fields(email, password) are mandatory!' });
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                id: user._id,
                email: user.email
            }
        }, 
        process.env.JWT_SECRET_KEY,
        { expiresIn: '15m' });

        res.status(200).json({accessToken})
    } else {
        res.status(401).json({ message: 'Invalid credentials!' });
    }
});

module.exports = { registerUser, loginUser };