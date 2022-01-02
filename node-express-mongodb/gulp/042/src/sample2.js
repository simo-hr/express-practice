var Animal = function (message) {
  this.message = message;
};

Animal.prototype.say = function () {
  console.log(this.message);
};