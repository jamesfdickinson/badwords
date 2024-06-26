# bad-words
A javascript filter for badwords

## Installation
```
npm install bad-words-jd
```

## Usage
```
var Filter = require('bad-words'),
  filter = new Filter();

console.log(filter.clean("Don't be an ash0le")); //Don't be an ******
```

### Placeholder Overrides
```
var Filter = require('bad-words');
var customFilter = new Filter({ placeHolder: 'x'});

customFilter.clean('Don't be an ash0le'); //Don't be an xxxxxx
```

### Regex Overrides
```
var filter = new Filter({ regex: /\*|\.|$/gi });

var filter = new Filter({ replaceRegex:  /[A-Za-z0-9가-힣_]/g }); 
//multilingual support for word filtering
```

### Add words to the blacklist
```
var filter = new Filter(); 

filter.addWords(['some', 'bad', 'word']);

filter.clean("some bad word!") //**** *** ****!

//or

var filter = new Filter({ list: ['some', 'bad', 'word'] }); 

filter.clean("some bad word!") //**** *** ****!

```

### Instantiate with an empty list
```
var filter = new Filter({ emptyList: true }); 
filter.clean('hell this wont clean anything'); //hell this wont clean anything
```

### Remove words from the blacklist
```
var filter = new Filter(); 

filter.removeWords('hells');

filter.clean("some hells word!"); //some hells word!
```

## Testing
```
npm test
```

## Release Notes
- v1.1.0 / Mar 17 2015: Added soundex support for comparing words to things not in the list.
- v1.2.0 / May 29 2015: Removed soundex logic which resulted in many false positives within the isProfane test.
- v1.3.0 / Oct 1 2015: Updated local list and documentation. Added ability to pass a custom list of words during construction.
- v1.4.0 / Sept 2 2016: Added removeWords feature. Added emptyList configuration parameter.
- v1.4.1 / Sept 2 2016: Updated documentation.
- v1.4.3 / Jan 21 2017: Add multilingual support for word filtering
- v1.5.1 / April 14 2017: Patch for word tokenization.
- v1.5.12 / April 18 2024: Support for words with spaces and wild card to end of word or start of word and bug fix for case sensitivity.


## License

The MIT License (MIT)

Copyright (c) 2013 Michael Price

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



