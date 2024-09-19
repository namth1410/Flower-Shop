document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let nameQuery = urlParams.get("search");
  let tagQuery = urlParams.get("tags");

  if (!nameQuery) {
    nameQuery = "";
  }

  let url = `http://namth.muotacademy.com:8080/api/flowers?name=${nameQuery}`;

  if (tagQuery) {
    url = `http://namth.muotacademy.com:8080/api/flowers/tags`;
    fetch(url, {
      method: "POST", // Chuyển phương thức sang POST
      headers: {
        "Content-Type": "application/json", // Định nghĩa loại nội dung là JSON
      },
      body: JSON.stringify({
        tagIds: [tagQuery], // Chuyển đổi đối tượng body thành chuỗi JSON
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Clear existing tbody content

        shopWrapper.innerHTML = "";
        if (data.message) {
          return;
        }
        data.forEach((item) => {
          const productItem = `
        <div class="col-md-6 col-sm-6 col-lg-4 col-custom product-area">
        <div class="product-item">
          <div class="single-product position-relative mr-0 ml-0">
            <div class="product-image">
              <a class="d-block" href="product-details.html?id=${
                item.idflower
              }">
                <img
                  src="assets/images/product/${
                    item.image?.[0]?.image_source ?? 1
                  }.jpg"
                  alt=""
                  class="product-image-1 w-100"
                />
              </a>
              <span class="onsale">Sale!</span>
              <div
                class="add-action d-flex flex-column position-absolute"
              >
                <a href="compare.html" title="Compare">
                  <i
                    class="lnr lnr-sync"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Compare"
                  ></i>
                </a>
                <a href="wishlist.html" title="Add To Wishlist">
                  <i
                    class="lnr lnr-heart"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  ></i>
                </a>
                <a
                  href="#exampleModalCenter"
                  title="Quick View"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <i
                    class="lnr lnr-eye"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick View"
                  ></i>
                </a>
              </div>
            </div>
            <div class="product-content">
              <div class="product-title">
                <h4 class="title-2">
                  <a href="product-details.html?id=${item.idflower}"
                    >${item.name}</a
                  >
                </h4>
              </div>
              <div class="product-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
              </div>
              <div class="price-box">
                <span class="regular-price">$${item.cost}</span>
                <span class="old-price"><del>$70.00</del></span>
              </div>
              <a href="cart.html" class="btn product-cart"
                >Add to Cart</a
              >
            </div>
            <div class="product-content-listview">
              <div class="product-title">
                <h4 class="title-2">
                  <a href="product-details.html?id=${item.idflower}"
                    >${item.name}</a
                  >
                </h4>
              </div>
              <div class="product-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
              </div>
              <div class="price-box">
                <span class="regular-price">$${item.cost}</span>
                <span class="old-price"><del>$70.00</del></span>
              </div>
              <p class="desc-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Fusce posuere metus vitae arcu imperdiet, id aliquet
                ante scelerisque. Sed sit amet sem vitae urna fringilla
                tempus.
              </p>
              <div class="button-listview">
                <a
                  href="cart.html"
                  class="btn product-cart button-icon flosun-button dark-btn"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Add to Cart"
                >
                  <span>Add to Cart</span>
                </a>
                <a
                  class="list-icon"
                  href="compare.html"
                  title="Compare"
                >
                  <i
                    class="lnr lnr-sync"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                  ></i>
                </a>
                <a
                  class="list-icon"
                  href="wishlist.html"
                  title="Add To Wishlist"
                >
                  <i
                    class="lnr lnr-heart"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Wishlist"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
              `;
          shopWrapper.innerHTML += productItem;
        });
      })
      .catch((error) => {
        console.error("Error fetching the cart:", error);
      });
  } else {
    url = `http://namth.muotacademy.com:8080/api/flowers?name=${nameQuery}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Clear existing tbody content

        shopWrapper.innerHTML = "";
        if (data.message) {
          return;
        }
        data.forEach((item) => {
          const productItem = `
        <div class="col-md-6 col-sm-6 col-lg-4 col-custom product-area">
        <div class="product-item">
          <div class="single-product position-relative mr-0 ml-0">
            <div class="product-image">
              <a class="d-block" href="product-details.html?id=${
                item.idflower
              }">
                <img
                  src="assets/images/product/${
                    item.image?.[0]?.image_source ?? 1
                  }.jpg"
                  alt=""
                  class="product-image-1 w-100"
                />
              </a>
              <span class="onsale">Sale!</span>
              <div
                class="add-action d-flex flex-column position-absolute"
              >
                <a href="compare.html" title="Compare">
                  <i
                    class="lnr lnr-sync"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Compare"
                  ></i>
                </a>
                <a href="wishlist.html" title="Add To Wishlist">
                  <i
                    class="lnr lnr-heart"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  ></i>
                </a>
                <a
                  href="#exampleModalCenter"
                  title="Quick View"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <i
                    class="lnr lnr-eye"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick View"
                  ></i>
                </a>
              </div>
            </div>
            <div class="product-content">
              <div class="product-title">
                <h4 class="title-2">
                  <a href="product-details.html?id=${item.idflower}"
                    >${item.name}</a
                  >
                </h4>
              </div>
              <div class="product-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
              </div>
              <div class="price-box">
                <span class="regular-price">$${item.cost}</span>
                <span class="old-price"><del>$70.00</del></span>
              </div>
              <a href="cart.html" class="btn product-cart"
                >Add to Cart</a
              >
            </div>
            <div class="product-content-listview">
              <div class="product-title">
                <h4 class="title-2">
                  <a href="product-details.html?id=${item.idflower}"
                    >${item.name}</a
                  >
                </h4>
              </div>
              <div class="product-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
              </div>
              <div class="price-box">
                <span class="regular-price">$${item.cost}</span>
                <span class="old-price"><del>$70.00</del></span>
              </div>
              <p class="desc-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Fusce posuere metus vitae arcu imperdiet, id aliquet
                ante scelerisque. Sed sit amet sem vitae urna fringilla
                tempus.
              </p>
              <div class="button-listview">
                <a
                  href="cart.html"
                  class="btn product-cart button-icon flosun-button dark-btn"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Add to Cart"
                >
                  <span>Add to Cart</span>
                </a>
                <a
                  class="list-icon"
                  href="compare.html"
                  title="Compare"
                >
                  <i
                    class="lnr lnr-sync"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                  ></i>
                </a>
                <a
                  class="list-icon"
                  href="wishlist.html"
                  title="Add To Wishlist"
                >
                  <i
                    class="lnr lnr-heart"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Wishlist"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
              `;
          shopWrapper.innerHTML += productItem;
        });
      })
      .catch((error) => {
        console.error("Error fetching the cart:", error);
      });
  }
  const shopWrapper = document.querySelector(".shop_wrapper");
  //   updateCart();

  // Fetch data from the API
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Clear existing tbody content

  //       shopWrapper.innerHTML = "";
  //       data.forEach((item) => {
  //         const productItem = `
  //         <div class="col-md-6 col-sm-6 col-lg-4 col-custom product-area">
  //         <div class="product-item">
  //           <div class="single-product position-relative mr-0 ml-0">
  //             <div class="product-image">
  //               <a class="d-block" href="product-details.html">
  //                 <img
  //                   src="assets/images/product/${item.idflower}.jpg"
  //                   alt=""
  //                   class="product-image-1 w-100"
  //                 />
  //               </a>
  //               <span class="onsale">Sale!</span>
  //               <div
  //                 class="add-action d-flex flex-column position-absolute"
  //               >
  //                 <a href="compare.html" title="Compare">
  //                   <i
  //                     class="lnr lnr-sync"
  //                     data-toggle="tooltip"
  //                     data-placement="left"
  //                     title="Compare"
  //                   ></i>
  //                 </a>
  //                 <a href="wishlist.html" title="Add To Wishlist">
  //                   <i
  //                     class="lnr lnr-heart"
  //                     data-toggle="tooltip"
  //                     data-placement="left"
  //                     title="Wishlist"
  //                   ></i>
  //                 </a>
  //                 <a
  //                   href="#exampleModalCenter"
  //                   title="Quick View"
  //                   data-bs-toggle="modal"
  //                   data-bs-target="#exampleModalCenter"
  //                 >
  //                   <i
  //                     class="lnr lnr-eye"
  //                     data-toggle="tooltip"
  //                     data-placement="left"
  //                     title="Quick View"
  //                   ></i>
  //                 </a>
  //               </div>
  //             </div>
  //             <div class="product-content">
  //               <div class="product-title">
  //                 <h4 class="title-2">
  //                   <a href="product-details.html"
  //                     >${item.name}</a
  //                   >
  //                 </h4>
  //               </div>
  //               <div class="product-rating">
  //                 <i class="fa fa-star"></i>
  //                 <i class="fa fa-star"></i>
  //                 <i class="fa fa-star"></i>
  //                 <i class="fa fa-star-o"></i>
  //                 <i class="fa fa-star-o"></i>
  //               </div>
  //               <div class="price-box">
  //                 <span class="regular-price">$${item.cost}</span>
  //                 <span class="old-price"><del>$70.00</del></span>
  //               </div>
  //               <a href="cart.html" class="btn product-cart"
  //                 >Add to Cart</a
  //               >
  //             </div>
  //             <div class="product-content-listview">
  //               <div class="product-title">
  //                 <h4 class="title-2">
  //                   <a href="product-details.html"
  //                     >${item.name}</a
  //                   >
  //                 </h4>
  //               </div>
  //               <div class="product-rating">
  //                 <i class="fa fa-star"></i>
  //                 <i class="fa fa-star"></i>
  //                 <i class="fa fa-star"></i>
  //                 <i class="fa fa-star-o"></i>
  //                 <i class="fa fa-star-o"></i>
  //               </div>
  //               <div class="price-box">
  //                 <span class="regular-price">$${item.cost}</span>
  //                 <span class="old-price"><del>$70.00</del></span>
  //               </div>
  //               <p class="desc-content">
  //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //                 Fusce posuere metus vitae arcu imperdiet, id aliquet
  //                 ante scelerisque. Sed sit amet sem vitae urna fringilla
  //                 tempus.
  //               </p>
  //               <div class="button-listview">
  //                 <a
  //                   href="cart.html"
  //                   class="btn product-cart button-icon flosun-button dark-btn"
  //                   data-toggle="tooltip"
  //                   data-placement="top"
  //                   title="Add to Cart"
  //                 >
  //                   <span>Add to Cart</span>
  //                 </a>
  //                 <a
  //                   class="list-icon"
  //                   href="compare.html"
  //                   title="Compare"
  //                 >
  //                   <i
  //                     class="lnr lnr-sync"
  //                     data-toggle="tooltip"
  //                     data-placement="top"
  //                     title="Compare"
  //                   ></i>
  //                 </a>
  //                 <a
  //                   class="list-icon"
  //                   href="wishlist.html"
  //                   title="Add To Wishlist"
  //                 >
  //                   <i
  //                     class="lnr lnr-heart"
  //                     data-toggle="tooltip"
  //                     data-placement="top"
  //                     title="Wishlist"
  //                   ></i>
  //                 </a>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //               `;
  //         shopWrapper.innerHTML += productItem;
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching the cart:", error);
  //     });

  const tags = document.querySelectorAll(".tags a");
  tags.forEach((tag) => {
    const tagId = tag.getAttribute("data-tag");
    if (tagId === tagQuery) {
      // Thêm CSS trực tiếp cho thẻ <a> đang được chọn
      tag.style.backgroundColor = "#007bff"; // Màu nền
      tag.style.color = "#ffffff"; // Màu chữ
    }
  });
  // Thêm sự kiện click cho từng thẻ
  tags.forEach((tag) => {
    tag.addEventListener("click", function (event) {
      event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>

      // Lấy giá trị của tag từ thuộc tính data-tag
      const tagValue = this.getAttribute("data-tag");

      // Chuyển hướng đến trang shop.html với query string chứa tag đã chọn
      window.location.href = `/shop.html?tags=${tagValue}`;
      // window.location.href = `http://localhost:5500/DATN/DATN/shop.html?tags=${tagValue}`;
    });
  });
});
