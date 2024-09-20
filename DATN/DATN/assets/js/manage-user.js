const contentDiv = document.getElementById("content");
const searchInput = document.getElementById("search-account");

// Hàm debounce
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

function fetchUsers() {
  fetch("http://namth.muotacademy.com:8080/api/user")
    .then((response) => response.json())
    .then((users) => {
      displayUsers(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      contentDiv.innerHTML = '<div class="error">Error loading users.</div>';
    });
}

function displayUsers(users) {
  contentDiv.innerHTML = ""; // Clear loading message
  const table = document.createElement("table");
  const headerRow = `<tr>
        <th>ID</th>
        <th>Account</th>
        <th>Role</th>
    </tr>`;
  table.innerHTML = headerRow;

  users.forEach((user) => {
    const row = `<tr>
            <td>${user.id}</td>
            <td>${user.account}</td>
            <td>${user.role}</td>
        </tr>`;
    table.innerHTML += row;
  });

  contentDiv.appendChild(table);
}

const handleSearch = debounce(function () {
  const searchTerm = searchInput.value.toLowerCase();
  fetch("http://namth.muotacademy.com:8080/api/user")
    .then((response) => response.json())
    .then((users) => {
      const filteredUsers = users.filter((user) =>
        user.account.toLowerCase().includes(searchTerm)
      );
      displayUsers(filteredUsers);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      contentDiv.innerHTML = '<div class="error">Error loading users.</div>';
    });
}, 300); // Thay đổi giá trị delay theo nhu cầu

// Thêm sự kiện onchange cho ô tìm kiếm
searchInput.addEventListener("input", handleSearch);

// Fetch users on page load
fetchUsers();
