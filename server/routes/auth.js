const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Login endpoint
router.post('/', async (req, res) => {
	try {
		// Validate the request body
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		const { email, password } = req.body;

		// Check if the user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).send({ message: 'Invalid Email or Password' });
		}

		// Compare the provided password with the stored hashed password
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).send({ message: 'Invalid Email or Password' });
		}

		// Generate an authentication token for the user
		const token = user.generateAuthToken();

		// Send the token and success message in the response
		res.status(200).send({ data: token, message: 'Logged in successfully' });
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).send({ message: 'Internal Server Error' });
	}
});

// Validate the input data for login
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().required().label('Password'),
	});
	return schema.validate(data);
};

module.exports = router;
