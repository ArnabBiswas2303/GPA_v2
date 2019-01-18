let express = require('express');
let app = express();
let fs = require('fs');
let path = require('path');
let bodyParser = require('body-parser');
let cal = require('./public/cal.js');
let port = process.env.PORT || 8080;

let gradeNum = {
		"S" : 10,
		"A" : 9,
		"B" : 8,
		"C" : 7,
		"D" : 6,
		"E" : 5,
		"F" : 0,
		"P" : 0,
		"I" : 0,
		"MP": 0,
		"DT": 0
	}

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
	res.render('main.ejs');
});

app.post('/', (req, res) => {
	let sem = req.query.sem;
	let resultObj = fs.readFileSync(sem+'.json');
	let objResult = JSON.parse(resultObj);
	let nameObj = fs.readFileSync('Names.json');	
	let objNames = JSON.parse(nameObj);
	let regNum = req.query.regnum;	
	let result = objResult[regNum];
	let name = objNames[regNum];
	if(result){
		let gpa = cal(gradeNum, result);
		res.json({result: result, regNum: regNum, gpa : gpa, name: name});
	}
	else {
		res.send('<h1>404 result not found!</h1>');
	}
});

app.get('/dev', (req, res) => {
	res.render('creators.html');
});

app.listen(port, (req, res) => {
	console.log('Server running on port : ' + port);
});