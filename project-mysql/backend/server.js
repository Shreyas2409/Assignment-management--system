const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const logger = require('morgan');
const axios = require('axios');
const path = require('path');
const session =require('express-session');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const multer = require("multer");

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
app.options("*",cors());
app.use(session({
	secret: '039399232003030',
	resave: true,
	saveUninitialized: true
}));

//Multer local storage operation
const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, "./uploads");
},
filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
}
});const upload = multer({
storage
});
// MySQL Code goes here
const pool  = mysql.createConnection({
		connectionLimit : 10,
		host            : '127.0.0.1',
		user            : '',
		password        : '',
		database        : '',
		port            : ''
});

//faculty registration
app.post("/api/post1", (req, res) => {
	const name = req.body.name;
	const college = req.body.college;
	const email = req.body.email;
	const mobile = req.body.mobile;
	const password = req.body.password;
let query = "INSERT INTO faculty (name,college,email,mobile,password) VALUES (?,?,?,?,?);";
pool.connect();
pool.query(query,[name,college,email,mobile,password],(err,rows) =>{
	if(err){
		console.log(err)
	}
	else
	{
		var redir = { redirect: "/sign-in1" };
				return res.json(redir);
	}
})
});

//student registration
app.post("/api/post", (req, res) => {
	const name = req.body.name;
	const college = req.body.college;
	const sem = req.body.value;
	const branch = req.body.branch;
	const regno=req.body.regno;
	const section= req.body.section;
	const email = req.body.email;
	const password = req.body.password;
let query = "INSERT INTO student (name,college,sem,branch,regno,section,email,password) VALUES (?,?,?,?,?,?,?,?);";
pool.connect();
pool.query(query,[name,college,sem,branch,regno,section,email,password],(err,rows) =>{
	if(err){
		console.log(err)
	}
	else
	{
		var redir = { redirect: "/sign-in" };
				return res.json(redir);
	}
});
});

 //faculty login
app.post("/api/login1",(req,res) =>
{   
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	pool.connect();
	let query = "SELECT * FROM faculty WHERE email = ?";
		pool.query(query, [email],(error, results, fields) => {
				if(results.length>0){
					if(password==results[0].password && name == results[0].name ){
				req.session.loggedin = true;
				req.session.email = email;
				req.session.name = name;
				var redir = { redir: "faculty" };
				return res.json(redir);
			}
		} 
		});
});

//student login
app.post("/api/login",(req,res) =>
{   const regno= req.body.regno;
	const email = req.body.email;
	const password = req.body.password;
	pool.connect();
	let query = "SELECT * FROM student WHERE email = ?";
		pool.query(query,[email],(error, results, fields)=>{
					if(error)
					{
						res.send(error);
					}
				if(results.length>0){
					if(password==results[0].password && regno==results[0].regno){
				req.session.loggedin = true;
				req.session.email = email;
				req.session.regno = regno;
				var redir = { redir: "student" };
				return res.json(redir);
			}
		}
		});
});

//assignment and it's details upload
app.post("/api/upload",upload.single('file'),(req, res) => {
const url = req.protocol + '://' + req.get('host');
const faculty_name = req.body.name;
	const sub=req.body.sub;
	const sem=req.body.value;
	const branch=req.body.branch;
	const section=req.body.section;
	const chapter = req.body.chapter;
	const topic = req.body.topic;
	const file = req.file.filename;
	const date = req.body.date;
let query = "INSERT INTO upload2 (faculty_name,sub,sem,branch,section,chapter,topic,file,date) VALUES (?,?,?,?,?,?,?,?,?);";
pool.connect(); 
pool.query(query,[faculty_name,sub,sem,branch,section,chapter,topic,file,date],(err,rows) =>{
	if(err){
		console.log(err)
	}
});
});

//assignment details retrival
app.get("/api/assigmnetview",(req, res) => {
	const sem=req.body.value;
	const branch=req.body.branch;
	const section = req.body.section;
	let query = "SELECT * FROM upload2 WHERE sem = '"+7+"' AND branch = '"+CSE+"' " ;
pool.connect(); 
pool.query(query,(err,row,fields) =>{
	if(err){
		console.log(err)
	}
	else
	{
	console.log(row)
	}

});
});

//assignment file retrival
app.post("/api/assignmentpdf",(req, res) => {
	const sem=req.body.value;
	const branch=req.body.branch;
	
let query ="SELECT * FROM upload2 WHERE branch = ?" ;
pool.connect(); 
pool.query(query,[branch],(err,row,fields) =>{
	if(err){
		console.log(err)
	}
	else
	{
		console.log(row)
		//return res.sendFile(`${__dirname}/uploads/${row}`);
	}

});
});

//student branch and sem retrival
app.post("/api/retrival",(req, res) => {
const regno = req.session.regno;
console.log(regno)

let query = "SELECT * FROM student WHERE regno = ?";
pool.connect(); 
pool.query(query,[regno],(err,rows) =>{
	if(err){
		console.log(err)
	}
	else
	{
	return res.json(rows)
	}
});
});

//student data retrival
app.get("/api/sdata",(req,res) =>
{
const regno1 = req.session.regno;
console.log(regno1)
 let query = "SELECT * FROM student WHERE regno = ? ";
pool.connect();
pool.query(query,[regno1],(err,rows) =>{
	if(err){
		console.log(err)
	}
	else
	{
    res.json(rows)
	}

});
});

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`));
