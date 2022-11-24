
module.exports.parseDict = function(source) {
    var TranslateArray = [];
    var parsedObj = {};
    var keyList = Object.keys(source);
    var lastKey = keyList[keyList.length -1];
    var range = lastKey[lastKey.length -1];
    range = parseInt(range);
    parsedObj['title'] = source['formTitle'];
    parsedObj['example'] = source['formExample'];
    var sentences = [];
    var increment = 1;
    
    for (i = 0; i < range; i++) {
      var newDict = {};
      for (const [key, value] of Object.entries(source)) {
        if (key[key.length - 1] == increment) {
          newDict[key] = value;
        }
        if (source['formTranslate'] == 'includeTranslation') {
          var li = Object.values(newDict);
          var toTranslate = li.join(' ');
        } 
      }
      TranslateArray.push(toTranslate);
      sentences.push(newDict);
      increment += 1;  
    }
    parsedObj['sentenceList'] = sentences
    return [parsedObj, TranslateArray]
  }

