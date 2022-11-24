
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app = express();
const programs = require(__dirname + '/programs.js');



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var scram = {}; 
var translation =[];

app.get('/', function(req, res) { 
    res.render('home');
});

app.post('/', function(req, res) {
    var userInput = programs.parseDict(req.body);
    scram = userInput[0];
    translation = userInput[1];
    console.log(scram);
    console.log(translation);
    
});

app.get('/quiz', function(req, res) {
    res.render('quiz');
});

app.listen(3000, function() {
    console.log('server running on port 3000');
});
