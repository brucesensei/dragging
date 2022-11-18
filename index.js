
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var scram = {} 


app.get('/', function(req, res) { 
    res.render('home');
});

app.post('/', function(req, res) {
    var scram = {
        title: req.body.formTitle,
        example: req.body.formExample,
        motherTounge: req.body.formTranslate,
        sentenceList: [
          {
            beginning: req.body.formBeginning,
            middle: req.body.formMiddle,
            end: req.body.formEnd,
        },
          ],
        };
});

app.get('/quiz', function(req, res) {
    res.render('quiz');
});



app.listen(3000, function() {
    console.log('server running on port 3000');
});

// if the form box is not checekd the return value is undefined
// if it is checked the name 'includeTranlation' is returned.