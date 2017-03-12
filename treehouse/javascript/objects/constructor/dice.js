function Dice(sides) {
  this.sides = sides;
}

Dice.prototype.roll = function () {
  var random = Math.floor(Math.random() * this.sides) + 1;
  return random;
}

var dice = new Dice(6);
var dice2 = new Dice(2);
