var chai = require('chai');

describe('Sample Application', function() {
    describe('Test3', function() {
        var should = require('chai').should() 
          , foo = 'bar'
          , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
        it('tester3-1', function() {
            foo.should.be.a('string');
            foo.should.equal('bar');
            foo.should.have.lengthOf(3);
            beverages.should.have.property('tea').with.lengthOf(3);
        });
    }); 
});
