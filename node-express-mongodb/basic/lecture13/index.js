var util = require('util')

var Animal = function () {}

Animal.prototype.message = 'qwert'

Animal.prototype.say = function () {
  console.log(this.message)
}

var Dog = function () {
  Animal.call(this)
  this.message = 'わんわん'
}
// ES2016以降は非推奨の書き方
util.inherits(Dog, Animal)

var dog = new Dog()
dog.say()
