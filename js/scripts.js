// ******* Backend ******* //

function Shop(baseprice) {
	this.toppings = [];
	this.baseprice = baseprice;
}

function Shop.prototype.calcPrice(pizza) {
	return this.baseprice + this.toppings[pizza.topping].price
}

function Topping(name, price) {
	this.name = name;
	this.price = price;
}

function Pizza(topping) {
	this.topping = topping;
}


Shop.prototype.AddTopping(name, price) {
	this.toppings.push(new Topping(name, price));
}

// ******* JQuery ******* //

$(document).ready(function() {
	var shop = new Shop(700);

	shop.AddTopping("Cheese", 0);
	shop.AddTopping("Peporoni", 50);
	shop.AddTopping("Meat Lovers", 150);
	shop.AddTopping("Pineapple", 100);



});
