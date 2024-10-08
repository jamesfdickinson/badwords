
var Filter = require('../lib/badwords.js');
const	filter = new Filter();
const	assert = require('assert');

describe('filter', function(){
	describe('clean',function(){
		it('Should replace a bad word within a sentence asterisks (******)',function(){
			assert(filter.clean('Don\'t be an ash0le') === 'Don\'t be an ******');
		});

		it('Should replace multiple instances of any bad words within a sentence asterisks (******)',function(){
			assert(filter.clean('cnts ash0le knob xxx') === '**** ****** **** ***');
		});

		it('Should not replace anything within a sentence if there are no bad words',function(){
			assert(filter.clean('The cat ran fast') === 'The cat ran fast');
		});

		it('Should replace a string with proper placeholder when overridden', function(){
			var customFilter = new Filter({ placeHolder: 'x'});
			assert(customFilter.clean('This is a hells good test') === 'This is a xxxxx good test');
		});

		it('Should allow an instance of filter with an empty blacklist', function() {
			var customFilter = new Filter({
				emptyList: true
			});
			assert.equal(customFilter.clean('This is a hells good test') , 'This is a hells good test');
		});

		it('Should tokenize words according to regex word boundaries',function(){
			assert.equal(filter.clean('what a bitch...fuck you') , 'what a *****...**** you');
			assert.equal(filter.clean('<p>Don\'t be an asshole</p>'), '<p>Don\'t be an *******</p>');
		});

		it('Should detect spaces',function(){
			assert.equal(filter.clean('what a f u c k e r'), 'what a ******');
			assert.equal(filter.clean('<p>Don\'t Blow me</p>'), '<p>Don\'t ******</p>');
		});
		it('Should replace NOT replace part of the word', function(){
			var customFilter = new Filter({list: ['hell']});
			  assert.equal(customFilter.clean('This is a hells good test'), 'This is a hells good test');
		});
		it('Should replace NOT replace part of the word 2 ', function(){
			var customFilter = new Filter({list: ['ass']});
			  assert.equal(customFilter.clean('This is a hass good test'), 'This is a hass good test');
		});
		it('Should replace full word with wildcard', function(){
			var customFilter = new Filter({list: ['hell*']});
			  assert.equal(customFilter.clean('This is a hells good test'), 'This is a ***** good test');
		});
		it('Should not replace snobby', function(){

			  assert.equal(filter.clean('snobby'), 'snobby');
		});
	});
});