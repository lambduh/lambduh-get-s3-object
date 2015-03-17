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

 describe('validation', function() {
    it('should throw an error on null options input', function(done) {
      get()().then(function() {
        done(new Error('Expected function to throw error'));
      }, function(err) {
        if (err) {
          done();
        } else {
          done(new Error('Expected err object to exist'));
        }
      })
    });

    it('should require srcBucket param', function(done) {
      get()({}).then(function() {
        done(new Error('Expected function to throw error'));
      }, function(err) {
        if (err) {
          done();
        } else {
          done(new Error('Expected err object to exist'));
        }
      })
    });

    it('should require srcKey param', function(done) {
      var options = {
        srcBucket: "my-lil-red-bucket"
      }
      get()(options).then(function() {
        done(new Error('Expected function to throw error'));
      }, function(err) {
        if (err) {
          done();
        } else {
          done(new Error('Expected err object to exist'));
        }
      })
    });

    it('should require downloadFilepath param', function(done) {
      var options = {
        srcBucket: "my-lil-red-bucket",
        srcKey: "my-red-lil-key.png"
      }
      get()(options).then(function() {
        done(new Error('Expected function to throw error'));
      }, function(err) {
        if (err) {
          done();
        } else {
          done(new Error('Expected err object to exist'));
        }
      })
    });
  });

  //TODO: implement properly - mock AWS.S3 .getObject()
  xit('should resolve the options object when required params are included', function(done) {
    var options = {
      srcBucket: "my-lil-red-bucket",
      srcKey: "my-red-lil-key.png",
      downloadFilepath: "/tmp/my-red-lil-key.png",
      key: 'val'
    }
    get()(options).then(function(opts) {
      if (opts == options) {
        done();
      } else {
        done(new Error('Expected resolved options to match inputted options'));
      }
    }, function() {
      done(new Error('Expected function to pass'));
    })
  });

});
