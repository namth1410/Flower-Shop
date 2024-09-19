function updateCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const cartItemsWrapper = document.getElementById("cart-items");
  const cartItemCountElement = document.querySelector(".cart-item_count");
  if (!user) {
    cartItemCountElement.textContent = 0;
    return;
  }
  const url = `http://namth.muotacademy.com:8080/api/cart?id_user=${user.id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Reference the cart wrapper element

      // Clear the cart wrapper before adding new content
      cartItemsWrapper.innerHTML = "";

      if (data.message || data.sqlMessage) {
        cartItemCountElement.textContent = 0;
        return;
      }
      let totalCost = 0;
      // Loop through each product in the response and create the HTML structure
      data.forEach((item) => {
        totalCost += item.flower.cost * item.quantity;

        // Create the cart item HTML structure
        const cartItemHTML = `
              <div class="single-cart-item">
                <div class="cart-img">
                  <a href="cart.html">
                    <img src="assets/images/product/${item.id_flower}.jpg" alt="${item.flower.name}" />
                  </a>
                </div>
                <div class="cart-text">
                  <h5 class="title">
                    <a href="cart.html">${item.flower.name}</a>
                  </h5>
                  <div class="cart-text-btn">
                    <div class="cart-qty">
                      <span>${item.quantity}×</span>
                      <span class="cart-price">$${item.flower.cost}</span>
                    </div>
                    <button type="button" onclick="removeItem(${item.id})">
                      <i class="ion-trash-b"></i>
                    </button>
                  </div>
                </div>
              </div>
            `;

        // Append the cart item to the wrapper
        cartItemsWrapper.innerHTML += cartItemHTML;
      });
      cartItemsWrapper.innerHTML += `
            <div class="cart-price-total d-flex justify-content-between">
              <h5>Total :</h5>
              <h5>$${totalCost.toFixed(2)}</h5>
            </div>
            <div class="cart-links d-flex justify-content-between">
              <a class="btn product-cart button-icon flosun-button dark-btn" href="cart.html">View cart</a>
              <a class="btn flosun-button secondary-btn rounded-0" href="checkout.html">Checkout</a>
            </div>`;

      if (cartItemCountElement) {
        cartItemCountElement.textContent = data.length;
      }
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  updateCart();
});
