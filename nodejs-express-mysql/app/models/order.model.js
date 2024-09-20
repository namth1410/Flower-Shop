const sql = require("./db.js");

// Constructor
const Order = function(order) {
  this.id_user = order.id_user;
  this.id_flower = order.id_flower;
  this.id_order = order.id_order;
  this.quantity = order.quantity;
  this.cost = order.cost;
  this.status = order.status
};

// Tạo một bản ghi mới trong bảng order
Order.create = (newOrder, result) => {
  sql.query("INSERT INTO `order` SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};

// Tìm bản ghi order theo ID
Order.findById = (id, result) => {
  sql.query(`SELECT * FROM \`order\` WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Không tìm thấy bản ghi với ID này
    result({ kind: "not_found" }, null);
  });
};

// Tìm các bản ghi theo id_user và id_order
Order.findByUserIdAndOrderId = (id_user, id_order, result) => {
  sql.query("SELECT * FROM `order` WHERE id_user = ? AND id_order = ?", [id_user, id_order], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found orders: ", res);
      result(null, res);
      return;
    }

    // Không tìm thấy bản ghi
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (id_user, result) => {
  let query = "SELECT * FROM `order`";

  if (id_user) {
    query += " WHERE id_user = ?";
  }

  sql.query(query, [id_user], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};


Order.updateStatusById = (id, status, result) => {
  sql.query(
    "UPDATE `order` SET status = ? WHERE id = ?",
    [status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Không tìm thấy bản ghi với ID này
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order status: ", { id: id, status: status });
      result(null, { id: id, status: status });
    }
  );
};


// Xóa một bản ghi theo ID
Order.remove = (id, result) => {
  sql.query("DELETE FROM `order` WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Không tìm thấy bản ghi với ID này
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order with id: ", id);
    result(null, res);
  });
};

// Xóa tất cả các bản ghi trong bảng order
Order.removeAll = result => {
  sql.query("DELETE FROM `order`", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

Order.deleteByUserIdAndOrderId = (id_user, id_order, result) => {
  sql.query("DELETE FROM `order` WHERE id_user = ? AND id_order = ?", [id_user, id_order], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // Không tìm thấy bản ghi để xóa
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order with id_user: ", id_user, " and id_order: ", id_order);
    result(null, res);
  });
};

Order.updateByUserIdAndOrderId = (id_user, id_order, status, result) => {
  sql.query(
    "UPDATE `order` SET status = ? WHERE id_user = ? AND id_order = ?",
    [status, id_user, id_order],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // Không tìm thấy đơn hàng nào để cập nhật
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order with id_user: ", id_user, " and id_order: ", id_order);
      result(null, res);
    }
  );
};

module.exports = Order;
