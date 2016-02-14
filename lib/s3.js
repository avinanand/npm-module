var EventEmitter = require("events").EventEmitter;
var wrapper = require("./wrapper");
var Bucket = require("./bucket");
var util = require("util");
var DELAY = 50;

var S3 = function () {
  this._buckets = {};
  this.DELAY = DELAY;
  this.UPLOAD_DELAY = DELAY;
};
util.inherits(S3, EventEmitter);
exports.S3 = S3;

S3.prototype.createBucket = wrapper("createBucket", function (options) {
  var bucket = this._buckets[options.Bucket] = new Bucket(options);
  return bucket.toJSON();
});

S3.prototype.deleteObject = wrapper("deleteObject", function (options) {
  return this._buckets[options.Bucket].deleteObject(options);
});

S3.prototype.deleteObjects = wrapper("deleteObjects", function (options) {
  return this._buckets[options.Bucket].deleteObjects(options);
});

S3.prototype.getObject = wrapper("getObject", function (options, hasCallback) {
  return this._buckets[options.Bucket].getObject(options);
});

S3.prototype.putObject = wrapper("putObject", function (options) {
  return this._buckets[options.Bucket].putObject(options);
});

S3.prototype.uploadPart = wrapper("uploadPart", function (options) {
  return this._buckets[options.Bucket].uploadPart(options);
});

