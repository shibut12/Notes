'use strict';

var chai = require('chai'),
expect = chai.expect;

chai.should();

function isEven(num){
    return num % 2 === 0;
}

describe('Unit tests', function(){
    it('should return true when number is even', function(){
        isEven(4).should.be.true;
    });
});