var Filter = require('../lib/badwords.js');
const	filter = new Filter();
const	assert = require('assert');

describe('filter', function(){
  describe('removeWords',function(){
    it("Should allow you to remove words from the filter blacklist and no longer filter them",function(){
      filter.removeWords('hell');
      assert.equal(filter.clean('This is a hell good test') , 'This is a hell good test');
      filter.addWords('hell');
      assert.equal(filter.clean('This is a hell good test') , 'This is a **** good test');
    });
  });
});