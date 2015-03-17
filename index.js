var Q = require('q');
var fs = require('fs');
var AWS = require('aws-sdk');

module.exports = function() {
  return function(options) {
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

      var params = {
        Bucket: options.srcBucket,
        Key: options.srcKey
      };

      var file = fs.createWriteStream(options.downloadFilepath)
      var S3Req = new AWS.S3({params: params}).getObject();
      S3Req.on('complete', function() {
        def.resolve(options);
      });
      S3Req.on('error', function(err) {
        def.reject(err);
      });

      S3Req.createReadStream().pipe(file);
    }


    return def.promise;
  }
}
