const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// Define user schema
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
}, {
	timestamps: true,
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: '7d',
	});
	return token;
};

// Create User model
const User = mongoose.model('User', userSchema);

// Validate user data
const validateUser = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label('First Name'),
		lastName: Joi.string().required().label('Last Name'),
		email: Joi.string().email().required().label('Email'),
		password: passwordComplexity().required().label('Password'),
	});
	return schema.validate(data);
};

module.exports = {
	User,
	validateUser,
};
