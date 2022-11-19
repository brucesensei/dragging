var scram = {
  title: "Present Simple",
  example: "There are three cats sitting on the bench. I sometimes walk to school. How many times do I have to tell you that I am not interested in this anymore.",
  motherTounge: "includeTranslation",
  sentenceList: [
    {
      beginning: "",
      middle: "I usually eat beef curry at home.",
      end: "",
  },
{
  beginning: "what do you",
  middle: "want for your",
  end: "birthday?",
},
{
  beginning: "I usually eat",
  middle: "beef curry at home.",
  end: "",
},
{
  beginning: "",
  middle: "I usually eat beef",
  end: "curry at home.",
},
    ],
}

var text = ''
var shuffledText = [];
var questionNumber = 1;

const container = document.querySelector('.answer-container');
const questionBox = document.querySelector('.choice-box');
questionBox.addEventListener('dragenter', dragEnter);
questionBox.addEventListener('dragover', dragOver);
questionBox.addEventListener('drop', dropMe);

if (scram.example !== "") {
  scram.example = 'Example:  ' + scram.example;
  document.querySelector(".example-container").classList.add("gray");
}

if (scram.motherTounge === "includeTranslation") {
  document.getElementById('mother-tounge').innerHTML = 'how are you doing?';
  //EN english JA papanese
}

document.getElementById('question-number').innerHTML = questionNumber;
document.getElementById('total').innerHTML = scram.sentenceList.length;
document.getElementById('title').innerHTML = scram.title;
document.getElementById('example').innerHTML = scram.example;
//-----------------------------------------main logic----------------------------------------------

function formatQuestion() {
  if (questionNumber <= scram.sentenceList.length) {
    text = getText();
    document.getElementById('beginning').innerHTML = scram.sentenceList[questionNumber - 1].beginning;
    document.getElementById('end').innerHTML =  scram.sentenceList[questionNumber - 1].end;
    shuffledText = randomize(text);
    createDraggables(shuffledText); 
    document.getElementById('textBox').value = ''
  } else {
    questionBox.innerHTML = text = 'Round Completed'
    document.getElementById('beginning').innerHTML = ""
    document.getElementById('end').innerHTML = ""
  }
}

//-------------------------------------formatQuestion helper functions-----------------------------

function getText() {
  return scram.sentenceList[questionNumber - 1].middle
}

function randomize(text) {
  const splitText = text.split(' ');
  return splitText.sort((a, b) => 0.5 - Math.random());
}


function createDraggables(elements) {
  for (i = 0; i < elements.length; i++) {
      const newSpan = document.createElement('div');
      const newContent = document.createTextNode(elements[i]);
      newSpan.appendChild(newContent);
      newSpan.setAttribute('draggable', 'true');
      const elementId = 'draggable' + i.toString();
      newSpan.setAttribute('id', elementId);
      newSpan.setAttribute('class', 'word')
      newSpan.addEventListener('dragstart', dragStart);
      questionBox.appendChild(newSpan);  
      const newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'target-boxes');
      newDiv.addEventListener('dragenter', dragEnter);
      newDiv.addEventListener('dragover', dragOver);
      newDiv.addEventListener('drop', dropMe);
      container.appendChild(newDiv);
  }
}

// -------------------------------CheckAnswer-------------------------------------

function checkAnswer() {
  if (! questionBox.hasChildNodes()) {
    const showResult = document.querySelector('.choice-box');
    if (validate(text)) {
      showResult.classList.add('correct');
      showResult.classList.remove('choice-box')
      showResult.innerHTML = 'CORRECT!';
      setTimeout( () => {
        showResult.classList.remove('correct');
        showResult.classList.add('choice-box')
        showResult.innerHTML = '';
        removeNodes();
        questionNumber += 1;
        if (questionNumber <= scram.sentenceList.length) {
          document.getElementById('question-number').innerHTML = questionNumber;
        } else {
          document.getElementById('question-number').innerHTML = scram.sentenceList.length;
        }
        formatQuestion();
      }, '1000')
    } else {
      showResult.classList.add('wrong');
      showResult.classList.remove('choice-box')
      showResult.innerHTML = 'WRONG!';
      setTimeout( () => {
        showResult.classList.remove('wrong');
        showResult.classList.add('choice-box')
        showResult.innerHTML = '';
        removeNodes();
        shuffledText = randomize(text);
        createDraggables(shuffledText);
      }, '1000')
    }
  }
}

//--------------------------------------show answer-------------------------------------------------

function showAnswer() {
  questionBox.innerHTML = text;
    setTimeout( () => {
      questionBox.innerHTML = '';
      removeNodes();
      questionNumber += 1;
      if (questionNumber <= scram.sentenceList.length) {
        document.getElementById('question-number').innerHTML = questionNumber;
      } else {
        document.getElementById('question-number').innerHTML = scram.sentenceList.length;
      }
      formatQuestion();
    }, '4000') 
}

// -----------------------------------checkAnswer helper functions----------------------------------

function removeNodes() {
  let element = document.querySelector('.answer-container');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function validate(originalString) {
  var answerString = ''
  const myElement = document.querySelector('.answer-container');
  for (const child of myElement.children) {
    answerString += child.firstChild.innerHTML + ' ';
    }
    var answerText = answerString.slice(0, answerString.length - 1);
    return answerText === originalString;
}

// set draggable and drop zone behavior

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEnter(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
}

function dropMe(e) {
  if (! e.path[0].hasChildNodes() && e.path[0].className == 'target-boxes') {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(id);
      e.target.appendChild(draggable);
  }
  if (e.path[0].className == 'choice-box') {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);
  }
}
