// ******* Backend ******* //
function Shop(baseprice, currency) {
	this.toppings = [];
	this.baseprice = baseprice;
}

// Combine the base price with the topping price of the given pizza
function Shop.prototype.calcPrice(pizza) {
	return this.baseprice + this.toppings[pizza.topping].price
}

function Shop.prototype.prettyPrice(amt) {
	return parseFloat(amt * 0.01) + this.currency
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
	var shop = new Shop(699, "$");

	shop.AddTopping("Cheese", 0);
	shop.AddTopping("Peporoni", 50);
	shop.AddTopping("Meat Lovers", 150);
	shop.AddTopping("Pineapple", 100);



});
