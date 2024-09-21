function fetchOrderByUserId(id_user) {
  // Xây dựng URL với tham số id_user
  const url = `http://namth.muotacademy.com:8080/api/order?id_user=${encodeURIComponent(
    id_user
  )}`;

  // Thực hiện yêu cầu GET
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Xử lý dữ liệu nhận được từ API
      console.log("Data received:", data);
      return data;
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      console.error("There was a problem with the fetch operation:", error);
    });
}

function clearCart() {
  // Xây dựng URL với tham số id_user
  const url = `http://namth.muotacademy.com:8080/api/cart`;

  // Thực hiện yêu cầu GET
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Xử lý dữ liệu nhận được từ API
      console.log("ĐÃ clear giỏ hàng:", data);
      return data;
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi clear giỏ hàng:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo dữ liệu và lưu vào localStorage

  // Lưu dữ liệu vào localStorage
  const dataSaveToLocal = JSON.parse(localStorage.getItem("order"));
  console.log(dataSaveToLocal);
  
  if (!dataSaveToLocal) {
    fetchOrderByUserId(1);
    return;
  }
  // Gửi POST request cho từng đối tượng trong dataSaveToLocal
  dataSaveToLocal.forEach((order) => {
    fetch("http://namth.muotacademy.com:8080/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.message) {
          console.log("Order posted successfully:", result);
          localStorage.removeItem("order");
          fetchOrderByUserId(1);
          clearCart();
        }
      })
      .catch((error) => {
        console.error("Error posting order:", error);
      });
  });
});
