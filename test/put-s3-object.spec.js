var expect = require('chai').expect;

var get = require('../');

describe('getS3Object', function() {
  it('should exist', function() {
    expect(get).to.exist;
  });

  it('should return a function', function() {
    expect(get()).to.be.a('function');
  })

  it('should return a function that returns a promise', function() {
    expect(get()().then).to.exist;
  });
});
