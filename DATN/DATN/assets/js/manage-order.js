document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin") {
    window.location.href = "/index.html";
    // window.location.href = "/DATN/DATN/index.html";
  }
  const apiUrl = "http://namth.muotacademy.com:8080/api/order";
  const contentDiv = document.getElementById("content");
  const searchInput = document.getElementById("search-order-id");

  let ordersData = [];
  let debounceTimeout;

  const statuses = [
    "Pending",
    "Paid",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  // Fetch orders from the API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      ordersData = data; // Save all orders data
      displayOrders(data);
    })
    .catch((error) => {
      contentDiv.innerHTML = `<div class="error">Failed to load orders: ${error.message}</div>`;
    });

  // Function to display orders in a table
  function displayOrders(orders) {
    if (orders.length === 0) {
      contentDiv.innerHTML = '<div class="error">No orders found</div>';
      return;
    }

    // Create a table and its header
    let table = `
              <table>
                  <thead>
                      <tr>
                          <th>Order ID</th>
                          <th>User ID</th>
                          <th>Flower Name</th>
                          <th>Quantity</th>
                          <th>Cost</th>
                          <th>Status</th>
                          <th>Order Date</th>
                      </tr>
                  </thead>
                  <tbody>
          `;

    // Add rows for each order
    orders.forEach((order) => {
      table += `
                  <tr>
                      <td>${order.id_order}</td>
                      <td>${order.id_user}</td>
                      <td>${order.flower.name}</td>
                      <td>${order.quantity}</td>
                      <td>${order.cost}</td>
                      <td>
                          <select data-order-id="${
                            order.id_order
                          }" data-user-id="${order.id_user}">
                              ${statuses
                                .map(
                                  (status) =>
                                    `<option value="${status}" ${
                                      status === order.status ? "selected" : ""
                                    }>${status}</option>`
                                )
                                .join("")}
                          </select>
                      </td>
                      <td>${new Date(order.create).toLocaleDateString()}</td>
                  </tr>
              `;
    });

    // Close the table
    table += "</tbody></table>";

    // Insert the table into the content div
    contentDiv.innerHTML = table;

    // Add event listeners for each select element
    document.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", function () {
        const orderId = this.getAttribute("data-order-id");
        const userId = this.getAttribute("data-user-id");
        const newStatus = this.value;

        updateOrderStatus(userId, orderId, newStatus);
      });
    });
  }

  // Function to update order status
  function updateOrderStatus(userId, orderId, newStatus) {
    const url = `http://namth.muotacademy.com:8080/api/order/${userId}/${orderId}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update order status");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order status updated:", data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  }

  // Debounce function to limit the number of search requests
  function debounce(func, delay) {
    return function (...args) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Function to filter orders based on input
  function searchOrders() {
    const searchId = searchInput.value.trim();

    if (searchId === "") {
      displayOrders(ordersData); // Show all orders if no search input
    } else {
      // Filter orders by id_order
      const filteredOrders = ordersData.filter((order) =>
        order.id_order.includes(searchId)
      );

      displayOrders(filteredOrders); // Display filtered orders
    }
  }

  // Add event listener to input field with debounce (500ms delay)
  searchInput.addEventListener("input", debounce(searchOrders, 500));
});
