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

document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "http://namth.muotacademy.com:8080/api/flowers";
  updateCart();
  // Fetch data from API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const allSwiperWrappers = document.querySelectorAll(".swiper-wrapper");
      const swiperContainer = allSwiperWrappers[1];

      if (swiperContainer) {
        // Tạo HTML mới cho các phần tử .swiper-slide
        let slidesHtml = data.reduce((html, flower, index) => {
          const { idflower, name, cost, image } = flower;
          const productHtml = `
            <div class="single-product position-relative mb-30">
              <div class="product-image">
                <a class="d-block" href="product-details.html?id=${idflower}">
                  <img src="assets/images/product/${idflower}.jpg" alt="" class="product-image-1 w-100">
                  <img src="assets/images/product/${idflower}.jpg" alt="" class="product-image-2 position-absolute w-100">
                </a>
                <span class="onsale">Sale!</span>
                <div class="add-action d-flex flex-column position-absolute">
                  <a href="compare.html" title="Compare">
                    <i class="lnr lnr-sync" data-toggle="tooltip" data-placement="left" title="Compare"></i>
                  </a>
                  <a href="wishlist.html" title="Add To Wishlist">
                    <i class="lnr lnr-heart" data-toggle="tooltip" data-placement="left" title="Wishlist"></i>
                  </a>
                  <a href="#exampleModalCenter" title="Quick View" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                    <i class="lnr lnr-eye" data-toggle="tooltip" data-placement="left" title="Quick View"></i>
                  </a>
                </div>
              </div>
              <div class="product-content">
                <div class="product-title">
                  <h4 class="title-2"><a href="product-details.html?id=${idflower}">${name}</a></h4>
                </div>
                <div class="product-rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-o"></i>
                  <i class="fa fa-star-o"></i>
                </div>
                <div class="price-box">
                  <span class="regular-price">$${cost}</span>
                  <span class="old-price"><del>$90.00</del></span>
                </div>
                <a href="cart.html" class="btn product-cart">Add to Cart</a>
              </div>
            </div>
          `;

          // Thêm sản phẩm vào slide
          if (index % 2 === 0) {
            // Thêm một phần tử swiper-slide mới nếu không phải là phần tử đầu tiên
            if (index > 0) {
              html += "</div>"; // Đóng slide trước đó
            }
            html += '<div class="swiper-slide" style="width: 300px;">'; // Mở slide mới với width 300px
          }
          html += productHtml;

          // Đóng slide nếu đã thêm hai sản phẩm
          if ((index + 1) % 2 === 0) {
            html += "</div>";
          }

          return html;
        }, "");

        // Đóng phần tử swiper-slide cuối cùng nếu cần
        if (data.length % 2 !== 0) {
          slidesHtml += "</div>";
        }

        // Thay thế toàn bộ nội dung của swiperContainer
        swiperContainer.innerHTML = slidesHtml;
      }
    })
    .catch((error) => console.error("Error fetching flowers:", error));
});
