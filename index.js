let text = ''
var splitSentence = []

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const logic = require(__dirname + "/logic.js");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(req, res) { 
    res.render('index');

});


app.post('/', function(req, res) {
    text = req.body.userinput;
    let splitSentence = logic.splitText(text);
    let mixedArray = logic.shuffleArray(splitSentence);
    console.log(splitSentence)
})


app.listen(3000, function() {
    console.log('server running on port 3000');
});
