module.exports.allowDrop = function (ev) {
    ev.preventDefault();
  }

module.exports.drag = function (ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
module.exports.drop = function (ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }


module.exports.splitText = function (sentence) {
  let splitSentence = sentence.split(' ');
  return splitSentence;
}

module.exports.shuffleArray = function (array) {
  const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
  return shuffledArray
}
