// ******* Backend ******* //
function Shop(baseprice, currency) {
	this.toppings = [];
	this.baseprice = baseprice;
}

// Combine the base price with the topping price of the given pizza
Shop.prototype.calcPrice = function(pizza)  {
	return this.baseprice + this.toppings[pizza.topping].price
}

Shop.prototype.prettyPrice = function(amt) {
	return parseFloat(amt * 0.01) + this.currency
}

function Topping(name, price) {
	this.name = name;
	this.price = price;
}

function Pizza(topping) {
	this.topping = topping;
}

Shop.prototype.AddTopping = function(name, price) {
	this.toppings.push(new Topping(name, price));
}

// ******* JQuery ******* //

$(document).ready(function() {
	var shop = new Shop(699, "$");

	shop.AddTopping("Salame", 50);
	shop.AddTopping("Margherita", 50);
	shop.AddTopping("Vegitaria", 100);
	shop.AddTopping("Hawaiian", 150);
	shop.AddTopping("Mushroom", 130);
	shop.AddTopping("Marinara", 50);
	shop.AddTopping("Mexican", 100);
	shop.AddTopping("Quattro Formaggi", 120);

	var animtime = 250;

	var pizzaAnim = anime({
		targets: ".pizza",
		scale: 1.2,
		duration: animtime,
		autoplay: false,
		easing: "easeInQuad"
	});

	var SwapPizza = function(toppingid) {
		var topping = shop.toppings[toppingid]
		$(".pizza").attr("src", "img/" + topping.name + ".png")
		pizzaAnim.play();
		setTimeout(function(){
			pizzaAnim.reverse();
			pizzaAnim.play();
		}, animtime)
	}

	SwapPizza(0);

	
});
