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
      //TODO: unit test needs to enforce this
      result[key] = options[key];
    }

    var params = {
      Bucket: options.srcBucket,
      Key: options.srcKey
    };

    var file = fs.createWriteStream(options.downloadFilepath)

    if (options.region) {
      var S3 = new AWS.S3({params: params, region: options.region});
    } else {
      var S3 = new AWS.S3({params: params});
    }

    var downloadProgress = 0;
    var readStream = S3.getObject().createReadStream();

    readStream.on('data', function(chunk) {
      downloadProgress += chunk.length;
      if (options.logLevel == 'debug') {
        console.log('downloadProgress: ' + downloadProgress);
      }
    });
    readStream.on('error', function(err) {
      def.reject(err);
    });
    file.on('close', function () {
      console.log('downloaded: ' + params.Key);
      def.resolve(result);
    });
    readStream.pipe(file);

  }

  return def.promise;
}
