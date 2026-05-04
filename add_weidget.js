// For add_weidget.html page
let cartQantity = 1;
document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
});

function displayCartItems() {
  const container = document.querySelector(".product-container_weidget");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart"><p>Your cart is empty</p>
    <a class="back-to-tasty" href="tastyes-food.html">Continue Shopping</a>
    </div > `;
    return;
  }
  
  let totalPrice = 0;
  let cartHTML = '<div class="cart-page-items">';

  cart.forEach((item) => {
    const itemTotal = item.quantity * parseFloat(item.price.replace("$", ""));
    totalPrice += itemTotal;

    cartHTML += `
    <div class="cart_page-setting">
      <div class="cart-page-item">
        <img class="add_weidget-product" src="${item.image}" alt="${item.name}">
        <div class="cart-page-details">
          <p class="add_wediget-product_id">${item.name}</p>
          <p class="add_weidget-price-sect">Price:<a class="add_weidget-pricea"> ${item.price}</a></p>
          <div class="quantity">Quantity:
          <div class="cart-sectiuon_control">
            <button class="cart-button1 cart-add_weidget" data-id="${item.id}">+</button>
            <input class="cart-input_box" type="text" value="${item.quantity}" min="1" data-id="${item.id}">
            <button class="cart-button2 cart_remove_weidget" data-id="${item.id}">-</button>
          </div>
          </div>
          <p class="add_weidget-subtotal">Subtotal: <a class="add_weidget-price"> $${itemTotal.toFixed(2)}</a></p>
        </div>
        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
      </div>

          </div>
      </div>
      
    `;
  });
  const vatRate = 0.0664;
  const vatAmount = totalPrice * vatRate;

  const service = (1224/100);

  const totalprice_amount = vatAmount+service+totalPrice

  cartHTML += `
    <div class="cart_page-setting">
    <div class="cart-page-total">
    <div class="cart-out_section"> 🛒 your cart</div>
  
    <div class="setting-price" style="padding-left:30px;">
    <div class="price_control_price">
      <p>SubTotal:</p>
      <p class="cart-total-price js-price-total"> $${totalPrice.toFixed(2)}</p>
    </div>
      <div class="price_control_price">
      <p> vat $(6.64%):</p>
      <p class="cart-total-price js-vat-price"> $${vatAmount.toFixed(2)} </p>      
      </div>
      <div class="price_control_price"> 
      <p>handle and Service: </P>
      <a class="cart-total-price"> $${service.toFixed(2)} </a>
      </div>
      </div>
    <div class="price_control_price2" style="padding-left:30px;">
      <p> total: </p>
      <p> $${totalprice_amount.toFixed(2)}</p>
    </div>
    <nav>
      <button class="checkout-btn">Proceed to Checkout</button>
    </nav>
    </div>
    </div>
  </div>`;

  container.innerHTML = cartHTML;

  // Add remove functionality
  document.querySelectorAll(".remove-from-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeFromCart(id);
    });
  });
}
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cart-add_weidget")) return;
  const id = e.target.dataset.id;
  const cartItem = e.target.closest(".cart-page-item");
  const input = cartItem.querySelector(".cart-input_box");
  let quantity = parseInt(input.value);
  quantity++;
  input.value = quantity;

  const priceElement = cartItem.querySelector(".add_weidget-pricea");
  const priceString = priceElement.textContent; // "$350.00"
  const pricePerItem = parseFloat(priceString.replace("$", ""));
  updateCartInStorage(id, quantity);
  updateSubtotal(cartItem, quantity, pricePerItem);
  updateTotalDisplay();
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cart_remove_weidget")) return;
  const id = e.target.dataset.id;
  const cartItem = e.target.closest(".cart-page-item");
  const input = cartItem.querySelector(".cart-input_box");
  let quantity = parseInt(input.value);
  if (quantity > 1) {
    quantity--;
  }
  input.value = quantity;

  const priceElement = cartItem.querySelector(".add_weidget-pricea");
  const priceString = priceElement.textContent; // "$350.00"
  const pricePerItem = parseFloat(priceString.replace("$", ""));
  updateCartInStorage(id, quantity);
  updateSubtotal(cartItem, quantity, pricePerItem);
  updateTotalDisplay();
});

function updateCartInStorage(id, newQuantity) {
  // Get current cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the item with matching ID
  const item = cart.find((i) => i.id.toString() === id.toString());

  // Update its quantity
  if (item) {
    item.quantity = newQuantity;
  }

  // Save back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateSubtotal(cartItem, quantity, pricePerItem) {
  // Calculate new subtotal
  const subtotal = quantity * pricePerItem;

  // Find the subtotal element inside this cart item
  const subtotalElement = cartItem.querySelector(".add_weidget-subtotal");

  // Update the HTML with new value
  subtotalElement.innerHTML = `Subtotal: <a class="add_weidget-price"> $${subtotal.toFixed(2)}</a>`;
}

function updateTotalDisplay() {
  // Get fresh cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Calculate total
  let total = 0;
  cart.forEach((item) => {
    const price = parseFloat(item.price.replace("$", ""));
    total += price * item.quantity;
  });

  const vatRate = 0.0664;
  const vatAmount = total * vatRate;
  const vatAmountPrice = document.querySelector(".js-vat-price");

  if (vatAmountPrice) {
    vatAmountPrice.textContent = ` $${vatAmount.toFixed(2)}`;
  }

  const service = (1224/100);
  const totalprice_amount = vatAmount + service + total;

  const totalPriceElement = document.querySelector(".price_control_price2 p:last-child");
  if(totalPriceElement) {
    totalPriceElement.textContent = ` $${totalprice_amount.toFixed(2)}`;
  }
  
  // Find the total element and update it - FIXED THIS LINE
  const totalElement = document.querySelector(".cart-total-price");
  if (totalElement) {
    totalElement.textContent = ` $${total.toFixed(2)}`;
  }
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id.toString() !== id.toString());
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems(); // Refresh display
}




//switching page 
document.addEventListener("DOMContentLoaded", () => {
  const continueLink = document.querySelector("#tasty_continue");

  if (continueLink) {
    continueLink.addEventListener("click", (e) => {
      e.preventDefault();
      // Store the ID of the section you want to scroll to
      localStorage.setItem("scrollToSection", "shopping"); // or whatever your section ID is
      window.location.href = "tastyes-food.html";
    });
  }
});