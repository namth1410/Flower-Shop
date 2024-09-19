document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngăn chặn reload trang

    // Lấy dữ liệu từ form
    const account = document.getElementById("account").value;
    const password = document.getElementById("password").value;

    // Kiểm tra nếu tài khoản hoặc mật khẩu trống
    if (!account || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    // Gửi request đến API
    try {
      const response = await fetch(
        "http://namth.muotacademy.com:8080/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account: account,
            password: password,
            role: "user", // Cố định vai trò là user
          }),
        }
      );

      const result = await response.json();

      if (response.message) {
        alert(`Registration failed: ${result.message}`);
      } else {
        // window.location.href = "/DATN/DATN/login.html";
        window.location.href = "/login.html";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  });
