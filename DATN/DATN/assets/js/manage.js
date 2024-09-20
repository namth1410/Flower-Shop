document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin") {
    window.location.href = "/index.html";
  }

  const form = document.getElementById("product-form");
  const productList = document.getElementById("product-list");
  const searchInput = document.getElementById("search-input");

  // Hàm để fetch dữ liệu và render danh sách sản phẩm
  const fetchProducts = async (query = "") => {
    try {
      const apiUrl = `http://namth.muotacademy.com:8080/api/flowers?name=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      productList.innerHTML = "";
      data.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML = `
        <img src="assets/images/product/${product.idflower}.jpg" alt="${product.name}" class="product-image">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-cost">${product.cost} VND</p>
        <p class="product-description">${product.description}</p>
        <button class="delete-btn" data-id="${product.idflower}" 
          style="
            background-color: red;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          ">
          Xóa
        </button>
      `;

        productList.appendChild(productDiv);

        // Gắn sự kiện click cho nút Xóa
        const deleteButton = productDiv.querySelector(".delete-btn");
        deleteButton.addEventListener("click", async () => {
          const idflower = deleteButton.getAttribute("data-id");
          const confirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
          if (confirmed) {
            try {
              await fetch(
                `http://namth.muotacademy.com:8080/api/flowers/${idflower}`,
                {
                  method: "DELETE",
                }
              );
              alert("Sản phẩm đã được xóa!");
              fetchProducts(); // Cập nhật danh sách sản phẩm
            } catch (error) {
              console.error("Lỗi khi xóa sản phẩm:", error);
            }
          }
        });
      });
    } catch (error) {
      console.error("Lỗi khi fetch sản phẩm:", error);
    }
  };
  fetchProducts();

  // Xử lý khi form được submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const formData = new FormData(form);
    const name = formData.get("name");
    const cost = formData.get("cost");
    const description = formData.get("description");
    const imageFile = formData.get("product-image");
    const tagId = formData.get("tag"); // Lấy ID của tag

    if (!name || !cost || !description || !imageFile) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    try {
      const imageUrl = imageFile.name.replace(/\.jpg$/, ""); // Loại bỏ đuôi .jpg

      // Đăng tải thông tin sản phẩm cùng với đường dẫn ảnh
      await fetch("http://namth.muotacademy.com:8080/api/flowers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          cost,
          description,
          image_source: imageUrl,
          tag: tagId,
        }),
      });

      alert("Sản phẩm đã được thêm!");
      form.reset();
      fetchProducts(); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  });

  // Xử lý khi người dùng gõ vào thanh tìm kiếm
  searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    fetchProducts(query);
  });
});
