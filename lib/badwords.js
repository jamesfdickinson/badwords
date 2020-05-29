var Filter = (function () {
  function Filter(options) {
    options = options || {};
    this.list = options.emptyList && [] || options.list || require('./lang.json').words || require('badwords-list').array  || [];
    this.placeHolder = options.placeHolder || '*';
    this.regex = options.regex || /[^a-zA-z0-9|\$|\@]|\^/g;
    this.replaceRegex = options.replaceRegex || /\w/g;
  }

  Filter.prototype.isProfane = function isProfane(string) {
    var words = string.split(' ');
    for (var j = 0; j < words.length; j++) {
      var word = words[j].toLowerCase().replace(this.regex, '');
      //use regexp to find word.  
      //change all wild cards to regexp wild cards
      //ignore "(",")" and treat them as string not regex
      //note: regexp will go slower
      //note: could just pass raw regexp from input file.
      for (var k = 0; k < this.list.length; k++) {
        var rule = this.list[k];
        var reg = new RegExp("^" + rule.split("*").join(".*").split("(").join("\\(").split(")").join("\\)") + "$");
        if (reg.test(word))
          return true;
      }
      //old faster way with out wild cards
      // if (~this.list.indexOf(word)) {
      //   return true;
      // }
    }
    return false;
  };

  Filter.prototype.replaceWord = function replaceWord(string) {
    return string.replace(this.regex, '').replace(this.replaceRegex, this.placeHolder);
  };

  Filter.prototype.clean = function clean(string) {
    return string.split(/\b/).map(function (word) {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }.bind(this)).join('');
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