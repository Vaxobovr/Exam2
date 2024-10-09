const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);

if (cart.length === 0) {
	cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
} else {
	let totalPrice = 0;

	cart.forEach(item => {
		const cartItem = document.createElement('div');
		cartItem.classList.add('cart-item');

		cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <span>$${item.price}</span>
            <button class="remove-item"  onclick="${item.id}">Delete</button>
            `;

		cartItemsContainer.appendChild(cartItem);
		totalPrice += item.price;
	});

	totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

	document.querySelectorAll('.remove-item').forEach(button => {
		button.addEventListener('click', removeFromCart);
	});
}

function removeFromCart(event) {
	const productId = event.target.getAttribute('data-id');
	cart = cart.filter(item => item.id != productId);
	localStorage.setItem('cart', JSON.stringify(cart));
	location.reload();
}
