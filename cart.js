let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
    let cartItems = document.getElementById("cart-items");
    let totalPrice = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("total-price").innerText = "0";
        return;
    }

    cart.forEach((product, index) => {
        let item = document.createElement("div");
        item.className = "cart-item";
        item.innerHTML = `
            <input type="checkbox" class="checkout-checkbox" data-price="${product.price}">
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-info">
                <h2>${product.name}</h2>
                <p>Price: $${product.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(item);
    });

    updateTotal();
}

function updateTotal() {
    let checkboxes = document.querySelectorAll(".checkout-checkbox");
    let totalPrice = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            totalPrice += parseFloat(checkbox.getAttribute("data-price"));
        }
    });

    document.getElementById("total-price").innerText = totalPrice;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    let total = parseFloat(document.getElementById("total-price").innerText);

    if (total === 0) {
        
        let notification = document.createElement("div");
        notification.className = "cart-notification";
        notification.innerText = "Please select at least one product to checkout!";
        
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => notification.remove(), 300);
        }, 2000);

        return;
    }

    let notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerText = `Your total price is $${total}. Thank you for shopping!`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 300);
    }, 2000);

    let selectedIndexes = [];
    document.querySelectorAll(".checkout-checkbox").forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedIndexes.push(index);
        }
    });

    cart = cart.filter((_, index) => !selectedIndexes.includes(index));
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    document.getElementById("cart-items").addEventListener("change", updateTotal);
});


