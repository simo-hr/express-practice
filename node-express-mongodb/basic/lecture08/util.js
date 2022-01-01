var util = {};

util.inherits = function (child, parent) {
  child.prototype = parent.prototype;
  child.prototype.constructor = parent;
};

util.base = function (self, ...args) {
  var prototype = Object.getPrototypeOf(self);
  prototype.constructor.apply(self, args);
};


// var Dog = function () {
//   util.base(this);
// };
// util.inherits(Dog, Animal);