document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));

  const url = `http://namth.muotacademy.com:8080/api/order?id_user=${user.id}`;
  const tbody = document.querySelector("tbody");

  // Fetch data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Clear existing tbody content
      tbody.innerHTML = "";
      let subTotal = 0.0;
      // const subTotalElement = document.getElementById("sub_total");
      // const totalAmountElement = document.getElementById("total-amount");
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
                  <a href="#" class="remove-item" data-id="${item.id}">${item.status}</a>
                </td>
              </tr>
            `;

        // Append the row to the tbody
        tbody.insertAdjacentHTML("beforeend", row);
      });

      // subTotalElement.textContent = `$${subTotal.toFixed(2)}`;
      // totalAmountElement.textContent = `$${(subTotal + 70).toFixed(2)}`;

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
