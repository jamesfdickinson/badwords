var Filter = require('../lib/badwords.js');
const	filter = new Filter();
const	assert = require('assert');

describe('filter', function(){
	describe('replaceWord',function(){
		it("Should replace a bad word with asterisks (******)",function(){
			assert(filter.replaceWord("ash0le") == '******');
		});
	});
});