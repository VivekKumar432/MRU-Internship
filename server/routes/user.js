const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

// POST /api/users - Register a new user
router.post('/', async (req, res) => {
	try {
		// Validate the incoming request body
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		const { email, password, ...otherData } = req.body;

		// Check if a user with the given email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).send({ message: 'User with the given email already exists!' });
		}

		// Generate a salt and hash the password
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create and save the new user
		const newUser = new User({ ...otherData, email, password: hashedPassword });
		await newUser.save();

		res.status(201).send({ message: 'User created successfully' });
	} catch (err) {
		console.error('Error creating user:', err);
		res.status(500).send({ message: 'Internal Server Error' });
	}
});

module.exports = router;
