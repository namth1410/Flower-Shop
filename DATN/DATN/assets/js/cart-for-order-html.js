function updateCart() {
  const url = "http://namth.muotacademy.com:8080/api/cart?id_user=1";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Reference the cart wrapper element
      const cartItemsWrapper = document.getElementById("cart-items");
      const cartItemCountElement = document.querySelector(".cart-item_count");
      // sinh id_order ở đây
      const dataSaveToLocal = data.map((el) => ({
        id_order: Number(
          Date.now().toString() + Math.floor(Math.random() * 1000).toString()
        ), // unique id_order as a number
        id_user: el.id_user,
        id_flower: el.id_flower,
        quantity: el.quantity,
        cost: el.flower.cost,
        status: 200,
      }));
      // Clear the cart wrapper before adding new content
      cartItemsWrapper.innerHTML = "";
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
  const url = "http://namth.muotacademy.com:8080/api/cart?id_user=1";
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
                  <a href="#"><img class="img-fluid" src="assets/images/product/${item.flower.image[0].id_flower}.jpg" alt="${item.flower.name}" /></a>
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
                      <div class="dec qtybutton" data-id="${item.flower.idflower}" data-price="${item.flower.cost}" data-quantity="${item.quantity}" data-action="dec">-</div>
                      <div class="inc qtybutton" data-id="${item.flower.idflower}" data-price="${item.flower.cost}" data-quantity="${item.quantity}" data-action="inc">+</div>
                    </div>
                  </div>
                </td>
                <td class="pro-subtotal">
                  <span class="subtotal-amount">$${subtotal}</span>
                </td>
                <td class="pro-remove">
                  <a href="#" class="remove-item" data-id="${item.id}"><i class="lnr lnr-trash"></i></a>
                </td>
              </tr>
            `;

        // Append the row to the tbody
        tbody.insertAdjacentHTML("beforeend", row);
      });

      subTotalElement.textContent = `$${subTotal.toFixed(2)}`;
      totalAmountElement.textContent = `$${(subTotal + 70).toFixed(2)}`;
      const updateQuantity = (id_flower, change) => {
        const url = `http://namth.muotacademy.com:8080/api/cart`;
        const payload = { id_user: 1, id_flower: id_flower, quantity: change };

        fetch(url, {
          method: "POST", // Adjust method if necessary (PATCH or PUT)
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Quantity updated:", data);
            updateCart();
          })
          .catch((error) => {
            console.error("Error updating quantity:", error);
          });
      };

      const quantityButtons = document.querySelectorAll(".qtybutton");
      quantityButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id_flower = this.getAttribute("data-id");
          const action = this.getAttribute("data-action");
          const price = parseFloat(this.getAttribute("data-price"));

          const inputElement = this.parentElement.querySelector(
            ".cart-plus-minus-box"
          );
          let currentQuantity = parseInt(inputElement.value);

          // Determine the quantity change
          let quantityChange = action === "inc" ? 1 : -1;
          let newQuantity = currentQuantity + quantityChange;

          // Update the quantity in the input field
          currentQuantity += quantityChange;
          inputElement.value = currentQuantity;

          const subtotalElement =
            this.closest("tr").querySelector(".subtotal-amount");

          const newSubtotal = (newQuantity * price).toFixed(2);
          subtotalElement.textContent = `$${newSubtotal}`;

          const tongGiaHienTai = parseFloat(
            subTotalElement.textContent.slice(1)
          );
          subTotalElement.textContent = `$${(
            tongGiaHienTai +
            quantityChange * price
          ).toFixed(2)}`;
          totalAmountElement.textContent = `$${(
            tongGiaHienTai +
            quantityChange * price +
            70
          ).toFixed(2)}`;
          // Call the API to update the quantity
          updateQuantity(id_flower, quantityChange);
        });
      });

      const removeButtons = document.querySelectorAll(".remove-item");
      removeButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          const id = this.getAttribute("data-id");
          console.log("Removing item with ID:", id);
          updateCart();

          // Call your API to remove the item using the ID
          fetch(`http://namth.muotacademy.com:8080/api/cart/${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Item removed:", data);
              // Optionally, remove the row from the DOM
              this.closest("tr").remove();
            })
            .catch((error) => {
              alert(error);
              console.error("Error removing item:", error);
            });
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching the cart:", error);
    });
});

document
  .getElementById("checkout-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn điều hướng mặc định khi click vào link
    const totalAmountElement = document.getElementById("total-amount");

    // Lấy giá trị từ totalAmountElement, bỏ ký hiệu $ và chuyển thành số
    const amountInUSD = parseFloat(
      totalAmountElement.textContent.replace("$", "")
    );

    // Chuyển đổi sang tiền Việt (VNĐ)
    const amountInVND = (amountInUSD * 25000).toFixed(0); // Chuyển thành số nguyên

    const data = {
      amount: amountInVND, // Đặt giá trị đã tính toán vào đây
      bankCode: "",
      language: "vn",
    };

    fetch("http://localhost:8888/order/create_payment_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Payment URL:", data.paymentUrl);
        // Redirect to the payment URL
        window.location.href = data.paymentUrl;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
