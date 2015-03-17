# lambduh-s3-get-object
Download an object from S3.

# Install

```
npm i --save lambduh-get-s3-object
```

# Usage

```javascript
var Q = require('q');
var download = require('lambduh-get-s3-object');

//your lambda function
exports.handler = function(event, context) {
  var promises = [];
  
  promises.push(function(options) {
    options.srcBucket = "source-bucket"
    options.srcKey = "path/to/s3/key.txt"
    options.downloadFilepath = "/tmp/path/to/local/file.txt"
    return download()(options);
  })

  promises.reduce(Q.when, Q({}))
}
```

This module expects three fields on the passed `options` object: `.srcBucket`, `.srcKey`, and `.downloadFilepath`

It will download an object to the specified filepath from the specifed S3 bucket and key. 

NOTE: See the [general Lambduh README]() for info on the `options` object flow. (In short, an `options` object is expected to flow through the full promise chain, and modules are expected to act on it or pass it on, or both).

# Full disclosure

This module's tests don't yet cover the `aws-sdk` implementation - only the validation and other basic things.
I'm hoping to get back to this soon....
