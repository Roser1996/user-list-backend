const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Roser:1sSWOw1pZbq4jrA4@userlist-slulr.mongodb.net/User?retryWrites=true', 
	{ useNewUrlParser: true }, (err) => {
		if (err) {
			console.log("Error");
		}
	})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => console.log('Mongodb connected.'));

const Schema = mongoose.Schema;
const users = new Schema({
	id: Number,
	firstName: String,
	lastName: String,
	gender: String,
	age: Number,
	password: String
});
const Users = mongoose.model('users', users, 'lists');

module.exports = {
	mongo: db,
	Users: Users
}

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Roser:1sSWOw1pZbq4jrA4@userlist-slulr.mongodb.net/User";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("User").collection("lists");
//   // perform actions on the collection object
//   collection.insertMany([
//   	{
//   		"firstName": "Rui",
//   		"lastName": "Gan",
//   		"gender": "Male",
//   		"age": 23,
//   		"password": "123456Roser"
//   	}
//   ],(err, res) => {
//   	if (err || res.result.n !== 1) {
//   		console.log("error");
//   	}
//   	else {
//   		console.log("success");
//   	}
//   })
//   client.close();
// });


