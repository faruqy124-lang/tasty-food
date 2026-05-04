function popOut(index, mealType) {
  const item = foodData[mealType][index];

  let popHTML = `
    <div  class="quick-buy-setting"  >
<div class="add-list-container">
  <img class="add-list-food" src="${item.subItem.popImage}" alt="">
</div>
<div>
  <div>
  <p class="pop-steak-name">${item.subItem.foodName}</p>
  <p class="pop-info">${item.subItem.subTitle}</p>
</div>
<div>
  <img class="review-stars" src="${item.subItem.popRating.rate}" alt="">
</div>
<div class="sub-info">
  <a>price</a>
  <a>${item.subItem.popRating.popPrice}</a>
</div>
<div class="sub-info">
   <a>
    type
  </a>
  <button style="padding:5px 12px;">
    <a>
    non-vegan
  </a>
  </button>
</div>
<div class="sub-info">
  <a>Cuisines:</a>
<div class="button-section_add">
  <button style="padding:5px 10px">
     <a>thail</a>
  </button>
  <button>
    <a>french</a>
  </button>
  
</div>
</div>
<div class="sub-info">
  <a>Meat:</a>
<div class="button-section_add">
  <button>
     <a>beaf</a>
  </ button>
  <button style="padding:5px 10px">
    <a>beacon</a>
  </button>
  
</div>
</div>

<div class="sub-info">
  <a>vendor:</a>
  <a>catch</a>
</div>
<div class="sub-info">
  <a>type:</a>
  <a>dinner</a>
</div>
<div class="sub-info2">
  <a>quanity:</a>
  <div class="cart-setting">
    <input type="number" class="input-box" value="1" min="1">
    <div class="cart-button-setting">
      <button class="cart-button add-btn" >add</button>
      <button class="cart-button remove-btn " >remove</button>
    </div>
       
  </div>
</div>
  <div class="sub-info3">
  <p class="pop-steak-name">subtotal:</p>
  <a class="price"> ${item.subItem.popRating.popPrice}</a>
</div>
<div class="cart-adding-button">
  <div style="display: flex; flex-direction: row;   column-gap: 20px;
">
    
  </div>
  <div>
    <button class="buy-to-cart" data-id="${item.id}">
      buy now
    </button>
  </div>
</div>
<div>
  <a class="view-more" href="#">view more info</a>
</div>
  
</div>
  <div class="close-btn" onclick="
  document.querySelector('.js-pop-out-quick-buy').style.display = 'none';">
    &times;
  </div>
</div>


    `;

  // console.log(popHTML)
  const popup = document.querySelector(".js-pop-out-quick-buy");
  const container = popup;
  popup.innerHTML = popHTML;
  popup.style.display = "block";

  let cartQuantity = 1;
  let pricePerItem = parseFloat(
    item.subItem.popRating.popPrice.replace("$", ""),
  );

  function updatePrice(container) {
    const priceBox = container.querySelector(".price");
    const total = cartQuantity * pricePerItem;

    priceBox.textContent = `$${total}`;
  }

  function updateInput(container) {
    const input = container.querySelector(".input-box");
    input.value = cartQuantity;
  }

  popup.querySelector(".add-btn").addEventListener("click", (e) => {
    cartQuantity++;
    updateInput(container);
    updatePrice(container);
  });
  popup.querySelector(".remove-btn").addEventListener("click", (e) => {
    if (cartQuantity > 1) {
      cartQuantity--;
      updateInput(container);
      updatePrice(container);
    }
  });

  document.addEventListener("input", (e) => {
    if (!e.target.matches(".input-box")) return;

    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) value = 1;

    cartQuantity = value;

    const container = e.target.closest(".js-pop-out-quick-buy");
    updatePrice(container);
  });
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// close the addcart-display-setting
document.querySelector(".js-close-weidget").addEventListener("click", () => {
  const weidget = document.querySelector(".addcart-display-setting");
  weidget.style.display = "none";
});

// display the addcart-display-setting
document.addEventListener("click", (e) => {
  const button = e.target.closest(".js-add-weidget");
  if (!button) return;

  const weidget = document.querySelector(".addcart-display-setting");
  weidget.style.display = "block";

  const id = button.dataset.id;

  let product = null;

  Object.values(foodData).forEach((category) => {
    const found = category.find((item) => item.id == id);
    if (found) product = found;
  });

  if (!product) {
    console.log("Product not found 😭");
    return;
  }

  const cartContainer = document.querySelector(".cart-items");

  let existingItem = cart.find((item) => item.id == product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    existingItem = {
      id: product.id,
      name: product.rating.foodName,
      price: product.rating.price,
      quantity: 1,
      image: product.Image,
    };
    cart.push(existingItem);
  }
  renderCart();
});
function renderCart() {
  const cartContainer = document.querySelector(".cart-items");

  let totalPrice = 0.0;
  cartContainer.innerHTML = "";

  cart.forEach((item) => {
    const itemTotal = item.quantity * parseFloat(item.price.replace("$", ""));
    totalPrice += itemTotal;

    const cartItemHTML = `
       <div class="cart-item">
    <div class="cart-image">
      <img class="cart_image" src="${item.image}" alt="">
    </div>
    <div>
      <div class="cart-name">${item.name}</div>
      <div class="cart-quantity"> 
      <div class="cart_quantity_setting">
            <div>quantity:</div>
          <div> <input class="input-width_weidget" type="text" value="${item.quantity}" min="1" data-id="${item.id}">
          </div>
       </div>   
       <div class="button_weidget">
        <button class="add_quantity">
          add
        </button>
        <button class="remove_quantity">
          remove
        </button>
       </div>
      </div>
     <div class="cart-price">price: <strong>${item.price}</strong></div>
       <div class="closing-tag" data-id="${item.id}">&times;</div>
    </div>
    
  </div>
    `;
    cartContainer.innerHTML += cartItemHTML;
  });
  // Update total cart price
  const totalBox = document.querySelector(".cart-total-price");
  totalBox.textContent = `$${totalPrice.toFixed(2)}`;

  saveCart();
}
document.addEventListener("click", (e) => {
  const closeBtn = e.target.closest(".closing-tag");
  if (!closeBtn) return;

  const id = closeBtn.dataset.id;
  const index = cart.findIndex((item) => item.id.toString() === id);

  if (index !== -1) {
    cart.splice(index, 1);
    renderCart();
  }
});
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  renderCart();
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("add_quantity")) return;

  const cartItem = e.target.closest(".cart-item");
  const input = cartItem.querySelector(".input-width_weidget");
  const id = input.dataset.id;

  const item = cart.find((i) => i.id == id);

  if (item) {
    item.quantity++;
    renderCart();
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("remove_quantity")) return;

  const cartItem = e.target.closest(".cart-item");
  const input = cartItem.querySelector(".input-width_weidget");
  const id = input.dataset.id;

  const item = cart.find((i) => i.id == id);

  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    }
    renderCart();
  }
});

document.addEventListener("input", (e) => {
  // Only target cart quantity inputs
  if (!e.target.matches(".input-width_weidget")) return;

  let value = parseInt(e.target.value);
  if (isNaN(value) || value < 1) value = 1;

  const cartItemDiv = e.target.closest(".cart-item");
  const id = e.target.dataset.id;

  // Find the item in the cart
  const item = cart.find((i) => i.id == id);
  if (item) {
    item.quantity = value; // Update the cart quantity
    renderCart(); // Re-render cart to update prices
  }
});
document.addEventListener("keydown", (event) => {
  const target = event.target;

  // Only apply to a specific input (for example, cart quantity input)
  if (!target.matches(".input-width_weidget")) return;

  // Allow numeric keys (0-9) and control keys like Backspace
  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];

  if (
    !(event.key >= "0" && event.key <= "9") &&
    !allowedKeys.includes(event.key)
  ) {
    event.preventDefault(); // Block any other key
  }
});

// stealing of product id

  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("buy-to-cart")) return;

    const id = e.target.dataset.id;

    let product = null;

    Object.values(foodData).forEach((category) => {
      const found = category.find((item) => item.id == id);
      if (found) product = found;
    });

    if (!product) {
      console.log("Product not found");
      return;
    }

    let existingItem = cart.find((item) => item.id == product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = {
        id: product.id,
        name: product.rating.foodName,
        price: product.rating.price,
        quantity: 1,
        image: product.Image,
      };
      cart.push(newItem);
    }

    // 4. Save and render
    renderCart();

    // 5. Optional: Close the popup and show cart
    document.querySelector(".js-pop-out-quick-buy").style.display = "none";
    document.querySelector(".addcart-display-setting").style.display = "block";
  });
function weidgetDisplay() {
  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");

  let viewer = document.querySelector(".js-add-weidget_display");

  if (!viewer) {
    viewer = document.createElement("div");
    viewer.className = "js-add-weidget_display";
    viewer.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #333;
      color: white;
      padding: 15px;
      border-radius: 8px;
      z-index: 10000;
      max-width: 300px;
      font-size: 12px;
      display: none;
    `;
    document.body.appendChild(viewer);
  }

  // Toggle display
  if (viewer.style.display === "block") {
    viewer.style.display = "none";
  } else {
    // Show cart data
    if (cartData.length === 0) {
      viewer.innerHTML = `
        <strong>📦 Cart is Empty</strong><br>
        <button onclick="this.parentElement.style.display='none'" style="margin-top:10px">Close</button>
      `;
    }
   else {
        viewer.innerHTML = `
          <strong>📦 Cart (${cartData.length} items)</strong><br>
          ${cartData.map((item) => `${item.name} x${item.quantity} = ${item.price}`).join("<br>")}
          <button onclick="this.parentElement.style.display='none'" style="margin-top:10px">Close</button>
        `;
      }
    }
    viewer.style.display = "block";
  }

// Event listener (outside the function)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-add-weidget_display_pop")) {
    weidgetDisplay();
  }
});


function feedbackOut() {
  const feedback = document.querySelector(".js-feedback-section");
  if (feedback.style.display === "none") {
    feedback.style.display = "block";
  } else if (feedback.style.display === "block") {
    feedback.style.display = "none";
  }
}
