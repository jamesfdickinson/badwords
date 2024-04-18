require('assert');
var Filter = require('../lib/badwords.js'),
	filter = new Filter(),
	assert = require('better-assert');

describe('filter', function(){
	describe('isProfane',function(){
		it("Should detect a bad word and return a boolean value",function(){
			assert(filter.isProfane("ash0le"));
		});

		it("Should return false when no bad word is detected",function(){
			assert(filter.isProfane("wife") === false);
		});

		it("Should be able to detect a bad word in a sentence",function(){
			assert(filter.isProfane("that person is an ash0le"));
		});

		it('Filters out special characters appropriately', function() {
			assert(filter.isProfane("You're an asshole^ you are"));
		});
		it('Should detect wildcard filtered words from badwords-list', function(){
			assert(filter.isProfane('CheatingAssBitch'));
		});
		it('Should detect phrases from badwords-list', function(){
		 	assert(filter.isProfane('kill yourself'));
		});
		it('Should detect spaces+number filtered words from badwords-list', function(){
			assert(filter.isProfane('Hope she get C A N 3 R'));
		});
		it('Should detect spaces filtered words from badwords-list', function(){
			assert(filter.isProfane('Cheating C U N T'));
		});
		it('Should detect spaces filtered words from badwords-list', function(){
			assert(filter.isProfane('fuk u'));
		});
		it('Should detect spaces words alone from badwords-list', function(){
			assert(filter.isProfane('Blow me'));
		});
		it('Should detect spaces words alone from badwords-list', function(){
			assert(filter.isProfane('f u c k e r'));
		});

		it('Should detect wildcared words alone from badwords-list', function(){
			assert(filter.isProfane('fuck u'));
		});
	});
});
