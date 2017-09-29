// ******* Backend ******* //
function Shop(baseprice, currency) {
	this.toppings = [];
	this.sizes = [];
	this.baseprice = baseprice;
	this.currency = currency;
}

Shop.prototype.addSize = function(name, pricemult) {
	this.sizes.push(new Size(name, pricemult));
};

// Combine the base price with the topping price of the given pizza
Shop.prototype.calcPrice = function(toppingid)  {
	return this.baseprice + this.toppings[toppingid].price;
}

function Topping(name, price) {
	this.name = name;
	this.price = price;
}

function Size(name, pricemult) {
	this.name = name;
	this.pricemult = pricemult;
}

Shop.prototype.addTopping = function(name, price) {
	this.toppings.push(new Topping(name, price));
}

function Pizza(toppingid, size) {
	this.toppingid = toppingid;
	this.size = size;
}

// ******* JQuery ******* //

$(document).ready(function() {
	var shop = new Shop(6.99, "$");

	// TOPPINGS DEFINED HERE //
	shop.addTopping("Salame", .50);
	shop.addTopping("Margherita", .50);
	shop.addTopping("Vegitaria", 1.00);
	shop.addTopping("Hawaiian", 1.50);
	shop.addTopping("Mushroom", 1.40);
	shop.addTopping("Marinara", .50);
	shop.addTopping("Mexican", 1);
	shop.addTopping("Quattro Formaggi", 1.20);

	// SIZES DEFINED HERE //
	shop.addSize("Medium", 1);
	shop.addSize("Italian", 1.1);
	shop.addSize("Large", 1.15);
	shop.addSize("Family", 1.2);

	var animtime = 250;

	var pizzaAnim = anime({
		targets: ".pizza",
		scale: 1.2,
		duration: animtime,
		autoplay: false,
		easing: "easeInQuad"
	});

	var SwapPizza = function(pizza, first) {
		var topping = shop.toppings[pizza.toppingid]
		$("#pizza-name").text(topping.name)

		var price = shop.calcPrice(pizza.toppingid);

		console.log(topping);

		$("#pizza-price").text(price + shop.currency);
		$(".pizza").attr("src", "img/" + topping.name + ".png");
		if (!first) {
			pizzaAnim.reverse();
		}
		pizzaAnim.play();
		setTimeout(function(){
			pizzaAnim.reverse();
			pizzaAnim.play();
		}, animtime)
	}

	var pizza = new Pizza(0, 0)

	SwapPizza(pizza, true);

	$(".pizza-swap").click(function() {
		var dir = parseInt($(this).val());

		pizza.toppingid += dir;

		if (pizza.toppingid >= shop.toppings.length) {
			pizza.toppingid = 0;
		} else if (pizza.toppingid < 0) {
			pizza.toppingid = shop.toppings.length - 1;
		}
		SwapPizza(pizza, 0);
	});
});
