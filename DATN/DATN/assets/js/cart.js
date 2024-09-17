document.addEventListener("DOMContentLoaded", function () {
  const url = "http://namth.muotacademy.com:8080/api/cart?id_user=1";
  const tbody = document.querySelector("tbody");

  // Fetch data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Clear existing tbody content
      tbody.innerHTML = "";

      // Loop through each cart item and create rows
      data.forEach((item) => {
        const subtotal = (parseFloat(item.flower.cost) * item.quantity).toFixed(
          2
        );

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
                    <div class="dec qtybutton" data-id="${item.flower.idflower}" data-quantity="${item.quantity}" data-action="dec">-</div>
                    <div class="inc qtybutton" data-id="${item.flower.idflower}" data-quantity="${item.quantity}" data-action="inc">+</div>
                  </div>
                </div>
              </td>
              <td class="pro-subtotal">
                <span>$${subtotal}</span>
              </td>
              <td class="pro-remove">
                <a href="#" class="remove-item" data-id="${item.id}"><i class="lnr lnr-trash"></i></a>
              </td>
            </tr>
          `;

        // Append the row to the tbody
        tbody.insertAdjacentHTML("beforeend", row);
      });

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

          const inputElement = this.parentElement.querySelector(
            ".cart-plus-minus-box"
          );
          let currentQuantity = parseInt(inputElement.value);

          // Determine the quantity change
          let quantityChange = action === "inc" ? 1 : -1;

          // Update the quantity in the input field
          currentQuantity += quantityChange;
          inputElement.value = currentQuantity;
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
