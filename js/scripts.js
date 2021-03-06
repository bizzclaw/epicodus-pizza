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
Shop.prototype.calcPrice = function(pizza)  {
	var topping = this.toppings[pizza.toppingid];
	var size = this.sizes[pizza.size];

	return (this.baseprice + topping.price) * size.pricemult;
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

	// Main Frontend Logic //

	// HTML Generation //

	for (i = 0; i < shop.sizes.length; i++) {
		var size = shop.sizes[i];
		$("#pizza-sizes").append('<button type="button" class="pizza-selectsize btn btn-danger" value="' + i +'">' + size.name + '</button>')
	}
	$(".pizza-selectsize").first().addClass("disabled");

	// Animations //
	var animtime = 250;

	var pizzaAnim = anime({
		targets: ".pizza",
		scale: 1.2,
		duration: animtime,
		autoplay: false,
		easing: "easeInQuad"
	});

	var SwapPizza = function(pizza, first) {
		var topping = shop.toppings[pizza.toppingid];
		var size = shop.sizes[pizza.size];
		$("#pizza-name").text(size.name + " " + topping.name);

		var price = shop.calcPrice(pizza).toFixed(2);

		$("#pizza-price").text(price + shop.currency);
		$(".pizza").attr("src", "img/" + topping.name + ".png");

		// $(".pizza-frame").css("transform", "scale(" + size.pricemult + ")");

		if (!first) {
			pizzaAnim.reverse();
		}
		pizzaAnim.play();
		setTimeout(function(){
			pizzaAnim.reverse();
			pizzaAnim.play();
		}, animtime)
	}

	// Pizza Swapping //
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

		SwapPizza(pizza);
	});

	$(".pizza-selectsize").click(function(){
		pizza.size = parseInt($(this).val());
		SwapPizza(pizza);
		$(".pizza-selectsize").removeClass("disabled");

		$(this).addClass("disabled");
	});

	var cart = []

	var getCartTotal = function() {
		var total = 0;
		cart.forEach(function(cartedPizza) {
			total += shop.calcPrice(cartedPizza);
		});
		return total;
	}

	var updateCartTitle = function() {
		var total = getCartTotal();

		if (total > 0)  {
			$("#pizza-cart").fadeIn(300);
			$("#pizza-checkout").text("Checkout: " + total.toFixed(2) + shop.currency)
		} else {
			$("#pizza-cart").fadeOut(300);
		}
	}

	// adding and removing from cart //

	$("#pizza-add-cart").click(function() {

		var cartedPizza = Object.assign({id: cart.length}, pizza);
		cart.push(cartedPizza);
		updateCartTitle();
		$("#pizza-cart-buttons").append('<btn id="cart-' + cartedPizza.id + '" class="btn btn-danger cart-button" value="' + cartedPizza.id + '">' + $("#pizza-name").text() + "</btn>");
		console.log();
		$("#cart-" + cartedPizza.id).click(function(){
			var id = parseInt($(this).val());
			cart.splice(id, 1);
			$(this).remove();
			updateCartTitle();
		});
	});

	// orderpage //

	var fadeSwap = function(oldclass, newclass, fadetime) {
		$(oldclass).fadeOut(fadetime);
		setTimeout(function(){
			$(newclass).fadeIn(fadetime);
		}, fadetime)
	};

	$("#pizza-checkout").click(function(){
		$("#order-total").text(getCartTotal().toFixed(2) + shop.currency);
		fadeSwap("#pizza-shop", "#pizza-order", 300)
	});

	$("#pizza-order-confirm").submit(function(event) {
		event.preventDefault();
		$("#order-confirmation").fadeIn(200);
		$("#orderer-name").text($("#order-name").val());
		$("#orderer-address").text($("#order-address").val());
	});

	$("#pizza-shop-return").click(function() {
		$("#order-confirmation").fadeOut(300);
		fadeSwap("#pizza-order", "#pizza-shop", 300)
	});
});
