function updateCart() {
  const url = "http://namth.muotacademy.com:8080/api/cart?id_user=1";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Reference the cart wrapper element
      const cartItemsWrapper = document.getElementById("cart-items");
      const cartItemCountElement = document.querySelector(".cart-item_count");

      // Clear the cart wrapper before adding new content
      cartItemsWrapper.innerHTML = "";

      if (data.message) {
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
  const url = "http://namth.muotacademy.com:8080/api/order?id_user=1";
  const tbody = document.querySelector("tbody");
  updateCart();

  // Fetch data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Clear existing tbody content
      tbody.innerHTML = "";
      let subTotal = 0.0;
      const subTotalElement = document.getElementById("sub_total");
      const totalAmountElement = document.getElementById("total-amount");
      // Loop through each cart item and create rows
      data.forEach((item) => {
        const subtotal = (parseFloat(item.flower.cost) * item.quantity).toFixed(
          2
        );

        subTotal += parseFloat(subtotal);

        const row = `
              <tr>
                <td class="pro-thumbnail">
                  <a href="#"><span>${item.id_order}</span></a>
                </td>
                <td class="pro-title">
                  <a href="#">${item.flower.name}</a>
                </td>
                <td class="pro-price">
                  <span>$${item.flower.cost}</span>
                </td>
                <td class="pro-quantity">
                  <div class="quantity">
                    <div class="cart-plus-minus">
                      <input class="cart-plus-minus-box" value="${item.quantity}" type="text" readonly>
                    </div>
                  </div>
                </td>
                <td class="pro-subtotal">
                  <span class="subtotal-amount">$${subtotal}</span>
                </td>
                <td class="pro-remove">
                  <a href="#" class="remove-item" data-id="${item.id}"><i class="lnr lnr-checkmark-circle" style="color: #28a745;"></i></a>
                </td>
              </tr>
            `;

        // Append the row to the tbody
        tbody.insertAdjacentHTML("beforeend", row);
      });

      subTotalElement.textContent = `$${subTotal.toFixed(2)}`;
      totalAmountElement.textContent = `$${(subTotal + 70).toFixed(2)}`;

      const removeButtons = document.querySelectorAll(".remove-item");
      removeButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
          event.preventDefault();
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching the cart:", error);
    });
});
