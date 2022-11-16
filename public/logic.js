sentenceList = [
    "What do you do on New Year's day?",
    "What do you want for your birthday?",
    "I usually eat beef curry at home.",
    "I want to study home economics.",
  ]
  
  var text = ''
  var shuffledText = [];
  var questionNumber = 1;
  
  const container = document.querySelector('.answer-container');
  const questionBox = document.querySelector('.choice-box');
  questionBox.addEventListener('dragenter', dragEnter);
  questionBox.addEventListener('dragover', dragOver);
  questionBox.addEventListener('drop', dropMe);
  
  document.getElementById('question-number').innerHTML = questionNumber
  document.getElementById('total').innerHTML = sentenceList.length
  //-----------------------------------------main logic----------------------------------------------
  
  function formatQuestion() {
    if (questionNumber <= sentenceList.length) {
      text = getText();
      shuffledText = randomize(text);
      createDraggables(shuffledText); 
      document.getElementById('textBox').value = ''
    } else {
      questionBox.innerHTML = text = 'Round Completed'
    }
  }
  
  //-------------------------------------formatQuestion helper functions-----------------------------
  
  function getText() {
    return sentenceList[questionNumber - 1]
  }
  
  function randomize(text) {
    const splitText = text.split(' ');
    return splitText.sort((a, b) => 0.5 - Math.random());
  }
  
  
  function createDraggables(elements) {
    for (i = 0; i < elements.length; i++) {
        const newSpan = document.createElement('span');
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
        showResult.innerHTML = 'CORRECT!';
        setTimeout( () => {
          showResult.classList.remove('correct');
          showResult.innerHTML = '';
          removeNodes();
          questionNumber += 1;
          if (questionNumber <= sentenceList.length) {
            document.getElementById('question-number').innerHTML = questionNumber;
          } else {
            document.getElementById('question-number').innerHTML = sentenceList.length;
          }
          formatQuestion();
        }, '1000')
      } else {
        showResult.classList.add('wrong');
        showResult.innerHTML = 'WRONG!';
        setTimeout( () => {
          showResult.classList.remove('wrong');
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
        if (questionNumber <= sentenceList.length) {
          document.getElementById('question-number').innerHTML = questionNumber;
        } else {
          document.getElementById('question-number').innerHTML = sentenceList.length;
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
  