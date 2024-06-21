document.addEventListener('DOMContentLoaded', function () {
    const cart = document.querySelector('.cart');
    const count = document.getElementById('count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartModal = document.getElementById('cartModal');
    const closeModal = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    let cartCount = 0;
    let cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const productName = product.querySelector('h2').textContent;
            const productPrice = product.querySelector('p').textContent;

            const priceValue = parseFloat(productPrice.replace('ZAR', ''));

            const cartItem = {
                name: productName,
                price: priceValue,
                quantity: 1
            };

            const existingItemIndex = cartItems.findIndex(item => item.name === cartItem.name);
            if (existingItemIndex >= 0) {
                cartItems[existingItemIndex].quantity += 1;
            } else {
                cartItems.push(cartItem);
            }

            cartCount++;
            count.textContent = cartCount;
            updateCartModal();
        });
    });

    cart.addEventListener('click', function () {
        cartModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${item.name} (${item.quantity}) - $${item.price * item.quantity}</span>
                <button data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);

            cartItemElement.querySelector('button').addEventListener('click', function () {
                const itemName = this.getAttribute('data-name');
                removeCartItem(itemName);
            });
        });
        cartTotal.textContent = `Total: ZAR ${total.toFixed(2)}`;
    }

    window.addEventListener('click', function (event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    confirmButton.addEventListener('click', function () {
        if (cartItems.length > 0) {
            alert('Purchase confirmed! Thank you for your order.');
        } else {
            alert('Your cart is empty.');
        }
    });

    function removeCartItem(itemName) {
        const itemIndex = cartItems.findIndex(item => item.name === itemName);
        if (itemIndex >= 0) {
            cartCount -= cartItems[itemIndex].quantity;
            cartItems.splice(itemIndex, 1);
            count.textContent = cartCount;
            updateCartModal();
        }
    }
});
