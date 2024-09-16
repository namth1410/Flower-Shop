document.addEventListener("DOMContentLoaded", () => {
  // Lấy id từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

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
