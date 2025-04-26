// API endpoints
const API_URL = 'https://prakash-mart.onrender.com/api';

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

// DOM Elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const checkoutBtn = document.getElementById('checkout-btn');

// Fetch products from backend
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<p class="error">Failed to load products. Please try again later.</p>';
    }
}

// Display products
function displayProducts(productsToDisplay) {
    productList.innerHTML = '';
    if (productsToDisplay.length === 0) {
        productList.innerHTML = '<p class="no-products">No products found.</p>';
        return;
    }
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        saveCart();
        showNotification('Product added to cart!');
    }
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    let cartTotal = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartCount.textContent = '0';
        subtotal.textContent = '₹0';
        total.textContent = '₹0';
        return;
    }

    cart.forEach(item => {
        const itemTotal = parseInt(item.price.replace('₹', '')) * item.quantity;
        cartTotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.length;
    subtotal.textContent = `₹${cartTotal}`;
    total.textContent = `₹${cartTotal}`;
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
        saveCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
    showNotification('Product removed from cart');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Filter products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event listeners
searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);
checkoutBtn.addEventListener('click', async () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        });
        if (!response.ok) {
            throw new Error('Failed to place order');
        }
        const result = await response.json();
        showNotification('Order placed successfully! Order ID: ' + result.orderId);
        cart = [];
        updateCart();
        saveCart();
    } catch (error) {
        console.error('Error placing order:', error);
        showNotification('Failed to place order. Please try again.');
    }
});

// Initialize
fetchProducts();
updateCart(); 
