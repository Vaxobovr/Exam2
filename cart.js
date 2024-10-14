const cartItemsContainer = document.getElementById('cart-items');

// Mahsulotlarni localStorage'dan o'qish va ko'rsatish
function displayCartItems() {
	const selectedProducts = JSON.parse(localStorage.getItem('cart')) || [];

	cartItemsContainer.innerHTML = ''; // Oldingi kartalarni tozalash

	selectedProducts.forEach((product, index) => {
		const productDiv = document.createElement('div');
		productDiv.classList.add('product');
		productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button class="delete-btn" onclick="removeFromCart(${index})">Delete</button>
        `;
		cartItemsContainer.appendChild(productDiv);
	});
}

// Mahsulotni savatdan o'chirish
function removeFromCart(index) {
	let selectedProducts = JSON.parse(localStorage.getItem('cart')) || [];

	// Mahsulotni indeks orqali olib tashlaymiz
	selectedProducts.splice(index, 1);

	// Yangilangan savatni localStorage'ga qayta yozamiz
	localStorage.setItem('cart', JSON.stringify(selectedProducts));

	// Savatdagi mahsulotlar ro'yxatini yangilaymiz
	displayCartItems();

	// Savat sonini yangilash
	updateCartCountInLocalStorage();
}

// Cart sahifasidan chiqishda savat sonini yangilash
function updateCartCountInLocalStorage() {
	const cartCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;
	localStorage.setItem('cartCount', cartCount);
}

window.onload = function () {
	displayCartItems();
	updateCartCountInLocalStorage();
};
