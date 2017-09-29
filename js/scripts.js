// ******* Backend ******* //
function Shop(baseprice, currency) {
	this.toppings = [];
	this.baseprice = baseprice;
	this.currency = currency
}

// Combine the base price with the topping price of the given pizza
Shop.prototype.calcPrice = function(toppingid)  {
	return this.baseprice + this.toppings[toppingid].price
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
	var shop = new Shop(6.99, "$");

	shop.AddTopping("Salame", .50);
	shop.AddTopping("Margherita", .50);
	shop.AddTopping("Vegitaria", 1.00);
	shop.AddTopping("Hawaiian", 1.50);
	shop.AddTopping("Mushroom", 1.40);
	shop.AddTopping("Marinara", .50);
	shop.AddTopping("Mexican", 1);
	shop.AddTopping("Quattro Formaggi", 1.20);

	var animtime = 250;

	var pizzaAnim = anime({
		targets: ".pizza",
		scale: 1.2,
		duration: animtime,
		autoplay: false,
		easing: "easeInQuad"
	});

	var SwapPizza = function(toppingid, first) {
		var topping = shop.toppings[toppingid]
		$("#pizzaname").text(topping.name)

		var price = shop.calcPrice(toppingid);

		$("#pizzaprice").text(price + shop.currency);
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

	var currentPizza = 0;

	SwapPizza(currentPizza, true);

	$(".pizza-swap").click(function() {
		var dir = parseInt($(this).val());

		currentPizza += dir;

		if (currentPizza >= shop.toppings.length) {
			currentPizza = 0;
		} else if (currentPizza < 0) {
			currentPizza = shop.toppings.length - 1;
		}
		console.log(currentPizza);
		SwapPizza(currentPizza);
	});


});
