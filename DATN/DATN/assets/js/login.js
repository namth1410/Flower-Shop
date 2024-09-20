document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngăn chặn form reload trang

    // Lấy giá trị từ input
    const account = document.getElementById("account").value;
    const password = document.getElementById("password").value;

    // Kiểm tra nếu account hoặc password bị trống
    if (!account || !password) {
      alert("Please enter both account and password");
      return;
    }

    // Gửi request đến API
    try {
      const response = await fetch(
        "http://namth.muotacademy.com:8080/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account: account,
            password: password,
          }),
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.message) {
        alert(`Login failed: ${result.message}`);
      } else {
        localStorage.setItem("user", JSON.stringify(result));
        if (result.role === "admin") {
          window.location.href = "/manage.html";
          // window.location.href = "/DATN/DATN/manage.html";
          return
        }
        window.location.href = "/index.html";
        // window.location.href = "/DATN/DATN/index.html";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login");
    }
  });
