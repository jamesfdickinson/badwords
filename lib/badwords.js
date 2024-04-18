var Filter = (function () {
  function Filter(options) {
    options = options || {};
    this.list = options.emptyList && [] || options.list || require('./lang.json').words || require('badwords-list').array || [];
    this.placeHolder = options.placeHolder || '*';
    this.regex = options.regex || /[^a-zA-z0-9|\$|\@]|\^/g;
    this.replaceRegex = options.replaceRegex || /\w/g;
  }
  Filter.prototype.isProfane = function isProfane(string) {
    var word = string.toLowerCase()
    //use regexp to find word.  
    //change all wild cards to regexp wild cards
    //ignore "(",")" and treat them as string not regex
    //note: regexp will go slower
    //note: could just pass raw regexp from input file.
    for (var k = 0; k < this.list.length; k++) {
      var rule = this.list[k];
      // convert rule to regex
      const regex = rule.split("*").join("[a-zA-Z0-9-_]*");
      var reg = new RegExp(regex, "i"); //"i" is for case insensitive
      if (reg.test(word))
        return true;
    }
    //old faster way with out wild cards
    // if (~this.list.indexOf(word)) {
    //   return true;
    // }
    return false;
  };
  Filter.prototype.profaneWords = function profaneWords(string) {
    const word = string.toLowerCase()
    const badWordsFound = [];
    //use regexp to find word.  
    //change all wild cards to regexp wild cards
    //ignore "(",")" and treat them as string not regex
    //note: regexp will go slower
    //note: could just pass raw regexp from input file.
    for (var k = 0; k < this.list.length; k++) {
      var rule = this.list[k];
      // convert rule to regex
      const regex = rule.split("*").join("[a-zA-Z0-9-_]*");
      const reg = new RegExp(regex, "gi"); //"i" is for case insensitive
      
      // while ((myArray = reg.exec(string)) !== null) {
      //   let msg = `Found ${myArray[0]}. `;
      //   console.log(msg);
      // }

      const matches = string.match(reg);

      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          badWordsFound.push(matches[i].trim()) 
        }
      }
    }
    //old faster way with out wild cards
    // if (~this.list.indexOf(word)) {
    //   return true;
    // }
    return badWordsFound;
  };


  Filter.prototype.replaceWord = function replaceWord(string) {
    return string.replace(this.regex, '').replace(this.replaceRegex, this.placeHolder);
  };

  Filter.prototype.clean = function clean(phrase) {
    let newPrase = phrase;
    const badWordsFound = this.profaneWords(newPrase);
    // sort descending - longer items first
    badWordsFound.sort((a, b) => b.length - a.length);
    for (let j = 0; j < badWordsFound.length; j++) {
      let word = badWordsFound[j];
      const newWord = this.replaceWord(word);
      newPrase = newPrase.replace(word, newWord);
    }
    return newPrase;
  };

  Filter.prototype.addWords = function addWords(words) {
    words = (words instanceof Array) ? words : [words];
    this.list = this.list.concat(words);
  };

  Filter.prototype.removeWords = function removeWords() {
    var words = Array.prototype.slice.call(arguments);
    words.map(function (word) {
      return this.list.indexOf(word);
    }, this).filter(function (index) {
      return !!~index;
    }).forEach(function (index) {
      this.list.splice(index, 1);
    }, this);
  };

  return Filter;
})();

module.exports = Filter;