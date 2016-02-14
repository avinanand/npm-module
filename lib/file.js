var crypto = require("crypto");
var utils = require("./utils");
var Request = require("./request");

function File (ops) {
  this._data = utils.copy(ops);
  this._updateBody();
}

module.exports = File;

File.prototype.toJSON = function (includeBody) {
  var data = utils.copy(this._data);
  if (!includeBody) {
    delete data.Body;
  }
  return data;
};

File.prototype._updateBody = function () {
  if (this._data.Body) {
    this._data.ETag = utils.makeETag(this._data.Body);
    this._data.ContentLength = this._data.Body.length;
  }
};

File.prototype.getData = function () {
  return this._data.Body;
}
