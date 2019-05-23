const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database.js");

const app = express();
const port = 3010;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Resource-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  console.log("requst url = " + req.url);
	next();
})

app.get('/', (req, res) => {
	res.json("It's working!");
})

app.get('/app/all', (req, res) => {
	db.Users
	.find()
	.exec({}, (err, users) => {
		if (err) {
			console.log(err);
			res.json("Error");
		}
		else {
			res.json(users);
		}
	})
})

app.post('/app/insert', (req, res) => {
	const { firstName, lastName, gender, age, password } = req.body;
	db.Users
	.find()
	.exec({}, (err, users) => {
		if (err) {
			console.log(err);
			res.json("Error");
		}
		else {
			let id = 0;
			if (users) {
				id = users[users.length - 1].id + 1;
			}
			else {
				id = 1;
			}
			db.Users
			.create({
				id: id,
				firstName: firstName,
				lastName: lastName,
				gender: gender,
				age: age,
				password: password
			}, (err, result) => {
				if (err) {
					console.log("insert error");
					res.json(err);
				}
				else {
					console.log("insert success");
					res.json(result);
				}
			})
		}
	})
})

app.post('/app/edit', (req, res) => {
	const { id, firstName, lastName, gender, age, password } = req.body;
	db.Users
	.findOneAndUpdate({id: id}, {
		firstName: firstName,
		lastName: lastName,
		gender: gender,
		age: age,
		password: password
	}, (err, result) => {
		if (err) {
			console.log("update error");
			res.json(err);
		}
		else {
			res.json(result);
		}
	})
})

app.delete('/app/delete/:id', (req, res) => {
	const { id } = req.params;
	db.Users
	.deleteOne()
	.where('id').equals(id)
	.exec((err, users) => {
		if (err) {
			console.log(err);
			res.json("error");
		}
		else {
			res.json(users);
		}
	})
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
})







