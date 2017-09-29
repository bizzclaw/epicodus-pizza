function Shop() {
	this.toppings = [];
}

function Topping(name, price) {
	this.name = name;
	this.price = price;
}

Shop.prototype.AddTopping(name, price) {
	this.toppings.push(new Topping(name, price));
}

$(document).ready(function() {

});
