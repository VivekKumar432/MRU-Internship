const mongoose = require("mongoose");
const mongoURI = 'mongodb://localhost:27017/mydatabase';
module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		 mongoose.set('strictQuery', false);
		mongoose.connect('mongodb://localhost:27017/jatin_db', connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};