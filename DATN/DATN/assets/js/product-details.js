const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

function updateCart() {
  const url = "http://namth.muotacademy.com:8080/api/cart?id_user=1";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Reference the cart wrapper element
      const cartItemsWrapper = document.getElementById("cart-items");
      const cartItemCountElement = document.querySelector(".cart-item_count");

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

document.addEventListener("DOMContentLoaded", () => {
  // Lấy id từ URL
  updateCart();
  if (id) {
    // Fetch dữ liệu từ API
    fetch(`http://namth.muotacademy.com:8080/api/flowers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu nhận được
        console.log(data);

        // Lấy các phần tử HTML
        const productSummery = document.querySelector(".product-summery");
        const singleProductImg = document.querySelector(".single-product-img");
        const singleProductThumb = document.querySelector(
          ".single-product-thumb"
        );

        if (productSummery) {
          const productHead = productSummery.querySelector(".product-head");
          const productTitle = productHead
            ? productHead.querySelector(".product-title")
            : null;
          const regularPrice = productSummery.querySelector(".regular-price");
          const descContent = productSummery.querySelector(".desc-content");

          // Cập nhật nội dung
          if (productTitle) {
            productTitle.textContent = data.name;
          }

          if (regularPrice) {
            regularPrice.textContent = `$${data.cost}`;
          }

          if (descContent) {
            descContent.textContent = `${data.description}`;
          }
        }

        if (singleProductImg && singleProductThumb) {
          const img = singleProductImg.querySelector("img");
          img.src = `assets/images/product/${data.image[0].id_flower}.jpg`; // Thay đổi src tại đây

          const thumb = singleProductThumb.querySelector("img");
          thumb.src = `assets/images/product/${data.image[0].id_flower}.jpg`; // Thay đổi src tại đây
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  } else {
    console.error("Không tìm thấy id trong URL");
  }
});

document
  .getElementById("addToCartButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default action of the link

    const inputQuantityElement = document.getElementById("quantity-value");
    console.log(typeof parseInt(inputQuantityElement.value));

    const id_user = 1; // Replace this with the actual user ID
    const id_flower = id; // Replace this with the actual flower ID
    const quantity = parseInt(inputQuantityElement.value); // Replace this with the actual flower ID

    const url = "http://namth.muotacademy.com:8080/api/cart";

    const payload = {
      id_user: id_user,
      id_flower: id_flower,
      quantity: quantity,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add to cart");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Item added to cart:", data);
        window.location.href = "cart.html";
        // Add your success handling here (e.g., show a message)
      })
      .catch((error) => {
        alert(error);
        console.error("Error adding to cart:", error);
      });
  });
