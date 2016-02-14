var crypto = require("crypto");

function makeETag (data) {
  return "\"" + crypto.createHash("md5").update(data).digest("hex") + "\"";
}
exports.makeETag = makeETag;

function decorateResponse (res) {
  res = res || {};
  res.ResponseMetadata = { RequestId: generateUUID() };
  return res;
}
exports.decorateResponse = decorateResponse;

function removeFromList (array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      array.splice(i, 1);
    }
    return;
  }
}
exports.removeFromList = removeFromList;

function findWhere (array, obj) {
  var props = Object.keys(obj);
  for (var i = 0; i < array.length; i++) {
    var passable = true;
    for (var j = 0; j < props.length; j++) {
      if (array[i][props[j]] !== obj[props[j]]) {
        passable = false;
      }
    }
    if (passable)
      return array[i];
  }
  return null;
}
exports.findWhere = findWhere;

function copy (obj) {
  return update({}, obj);
}
exports.copy = copy;

function update (obj1, obj2) {
  Object.keys(obj2).forEach(function (prop) {
    obj1[prop] = obj2[prop];
  });
  return obj1;
}
exports.update = update;

function createError (err, options) {
  var originalError = null;
  if (typeof err.message === "string" && err.message !== "") {
    if (typeof options === "string" || (options && options.message)) {
      originalError = copy(err);
      originalError.message = err.message;
    }
  }
  err.message = err.message || null;

  if (typeof options === "string") {
    err.message = options;
  } else {
    update(err, options || {});
  }

  Object.defineProperty(err, "name", { writable: true, enumerable: false });
  Object.defineProperty(err, "message", { enumerable: true });

  err.name = err.name || err.code || "Error";
  err.time = new Date();

  if (originalError)
    error.originalError = originalError;

  return err;
}
exports.createError = createError;

function generateUUID () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function randomAlpha (n) {
  var alpha = "abcdefghijklmnopqrstuvwxyz";
  var res = "";
  for (var i = 0; i < n; i++) {
    res += alpha.charAt(Math.floor(Math.random() * alpha.length));
  }
  return res;
}

