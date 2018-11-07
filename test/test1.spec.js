var chai = require('chai');

describe('Sample Application', function() {
    describe('Test1', function() {
        var expect = require('chai').expect
          , foo = 'bar'
          , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
        it('tester1-1', function() {
            expect(foo).to.be.a('string');
            expect(foo).to.equal('bar');
            expect(foo).to.have.lengthOf(3);
            expect(beverages).to.have.property('tea').with.lengthOf(3);
        });
    }); 
});
