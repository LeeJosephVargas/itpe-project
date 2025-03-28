const products = [
    { id: 1, name: "Laptop", price: 800, image: "images/laptop.jpg", description: "Powerful laptop with high-end performance." },
    { id: 2, name: "Phone", price: 500, image: "images/phone.jpg", description: "Latest smartphone with stunning display." },
    { id: 3, name: "Headphones", price: 100, image: "images/headphones.jpg", description: "Wireless noise-canceling headphones." },
    { id: 4, name: "Smartwatch", price: 150, image: "images/watch.jpg", description: "Fitness tracking smartwatch with sleek design." },
    { id: 5, name: "Tablet", price: 400, image: "images/tablet.jpg", description: "Portable tablet for entertainment and work." },
    { id: 6, name: "Camera", price: 600, image: "images/camera.jpg", description: "Professional DSLR camera for photography lovers." },
    { id: 7, name: "Mouse", price: 40, image: "images/mouse.jpg", description: "Wireless ergonomic mouse for better productivity." },
    { id: 8, name: "Keyboard", price: 70, image: "images/keyboard.jpg", description: "Mechanical keyboard with customizable lighting." },
    { id: 9, name: "Monitor", price: 250, image: "images/monitor.jpg", description: "Ultra HD monitor with vibrant colors." },
    { id: 10, name: "Speaker", price: 120, image: "images/speaker.jpg", description: "High-quality Bluetooth speaker with deep bass." }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadProducts() {
    let productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";
    products.forEach(product => {
        let item = document.createElement("div");
        item.className = "product";
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>Price: $${product.price}</strong></p>
                <button onclick="addToCart(${product.id})" class="add-to-cart">Add to cart</button>
                <button onclick="viewSpecs(${product.id})" class="view-specs">View Specs</button>
            </div>
        `;
        productList.appendChild(item);
    });
}
function viewSpecs(id) {
    window.location.href = `product_specs.html?id=${id}`;
}
function addToCart(id) {
    let product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    let notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerText = `${product.name} has been added to your cart!`;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 2000);
}


function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartCount();
});
