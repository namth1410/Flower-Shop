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
        const subtotal = (parseFloat(item.price) * item.quantity).toFixed(2);

        const row = `
            <tr>
              <td class="pro-thumbnail">
                <a href="#"><img class="img-fluid" src="${item.image_source_thumbnail}" alt="${item.title}" /></a>
              </td>
              <td class="pro-title">
                <a href="#">${item.title}</a>
              </td>
              <td class="pro-price">
                <span>$${item.price}</span>
              </td>
              <td class="pro-quantity">
                <div class="quantity">
                  <div class="cart-plus-minus">
                    <input class="cart-plus-minus-box" value="${item.quantity}" type="text">
                    <div class="dec qtybutton">-</div>
                    <div class="inc qtybutton">+</div>
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
