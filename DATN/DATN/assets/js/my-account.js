document
  .getElementById("passwordChangeForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngăn chặn reload trang mặc định

    // Lấy giá trị từ input
    const currentPassword = document.getElementById("current-pwd").value;
    const newPassword = document.getElementById("new-pwd").value;
    const confirmPassword = document.getElementById("confirm-pwd").value;

    // Kiểm tra nếu mật khẩu mới và xác nhận mật khẩu không trùng khớp
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation password do not match");
      return;
    }

    // Gửi request POST để cập nhật mật khẩu
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `http://namth.muotacademy.com:8080/api/user/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Password changed successfully!");
        console.log(result); // Kết quả trả về từ server
      } else {
        alert(`Failed to change password: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while changing the password");
    }
  });

document
  .getElementById("logout_button")
  .addEventListener("click", function (event) {
    localStorage.clear();
  });

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
      window.location.reload();
      return data;
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi clear giỏ hàng:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let pageQuery = urlParams.get("page");

  const ordersBtn = document.getElementById("orders-page");
  if (pageQuery === "orders") {
    ordersBtn.click();
  }

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
