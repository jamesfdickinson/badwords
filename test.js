const Filter = require('./lib/badwords.js');
//const filterJD = new Filter({list:["f u c k e r","todd","f r e d"]});
const filter = new Filter();

//console.log(filterJD.isProfane("Blow me")); // false`

console.log(filter.isProfane("He is a f u c k e r")); // "f u c k e r"
console.log(filter.clean("He is a f u c k e r")); // "f u c k e r"

console.log(filter.clean("todd is a f r e d")); // "f u c k e r"


console.log(filter.clean('what a f u c k e r'));
console.log(filter.clean('<p>Don\'t Blow me</p>'));
console.log(filter.clean('what a bitch...fuck you'));


