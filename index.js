var Q = require('q');
var fs = require('fs');
var AWS = require('aws-sdk');

module.exports = function(result, options) {
  if (!result) { result = {} };
  var def = Q.defer();

  if (!options) {
    def.reject(new Error("S3 Download expected options to exist"));
  } else if (!options.srcBucket) {
    def.reject(new Error("S3 Download expected options.srcBucket to exist"));
  } else if (!options.srcKey) {
    def.reject(new Error("S3 Download expected options.srcKey to exist"));
  } else if (!options.downloadFilepath) {
    def.reject(new Error("S3 Download expected options.downloadFilepath to exist"));
  } else {

    for(var key in options) {
      //unit test needs to enforce this
      result[key] = options[key];
    }

    var params = {
      Bucket: options.srcBucket,
      Key: options.srcKey
    };

    var file = fs.createWriteStream(options.downloadFilepath)
    var S3 = new AWS.S3({params: params});
    S3.getObject()
      .on('httpData', function(chunk) {
        file.write(chunk)
      })
      .on('success', function() {
        def.resolve(result);
      })
      .on('error', function(err) {
        def.reject(err);
      })
      .send();

  }

  return def.promise;
}
