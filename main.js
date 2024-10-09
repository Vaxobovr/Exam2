const productContainer = document.getElementById('product');
const cartCount = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count when the page loads
updateCartCount();

// Fetch and display products from the API
function fetchProduct() {
	fetch('https://fakestoreapi.com/products')
		.then(response => response.json())
		.then(products => displayProducts(products))
		.catch(error => console.log('Error fetching products:', error));
}

// Display products on the page
function displayProducts(products) {
	products.forEach(product => {
		const productDiv = document.createElement('div');
		productDiv.classList.add('product');
		productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
		productContainer.appendChild(productDiv);
	});
}

// Add product to cart
function addToCart(productId) {
	fetch(`https://fakestoreapi.com/products/${productId}`)
		.then(response => response.json())
		.then(product => {
			cart.push(product);
			localStorage.setItem('cart', JSON.stringify(cart));
			updateCartCount(); // Update cart count after adding a product
		})
		.catch(error => console.log('Error adding product to cart:', error));
}

// Update the cart count in the DOM
function updateCartCount() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	cartCount.innerText = cart.length;
}

// Redirect to cart page
function redirectToCart() {
	window.location.href = 'cart.html';
}

// Load products when the page loads
window.onload = function () {
	fetchProduct();
	updateCartCount();
};
