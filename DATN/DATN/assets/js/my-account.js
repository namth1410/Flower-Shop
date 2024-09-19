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
