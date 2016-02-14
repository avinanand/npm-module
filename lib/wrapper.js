var Request = require("./request");

module.exports = function wrapper (methodName, fn) {
  return function (options, callback) {
    var s3 = this;
    s3.emit("npm-s3wrapper:call:" + methodName, options);

    var req = new Request(s3, methodName, fn, options);

    if (callback) {
      req.on("success", function (res) { callback(null, res); });
      req.on("error", callback);
    }
    req.on("complete", function () {
      s3.emit("npm-s3wrapper:complete:" + methodName, options);
    });

    return req;
  };
};
