const sql = require("./db.js");
const Flower = require('./flowers.model.js');

// Constructor
const Cart = function(cart) {
  this.id_user = cart.id_user;
  this.id_flower = cart.id_flower;
  this.quantity = cart.quantity;
};

// Create or update Cart entry
Cart.create = (newCart, result) => {
  // Kiểm tra xem đã có dòng nào với id_user và id_flower này chưa
  sql.query("SELECT * FROM cart WHERE id_user = ? AND id_flower = ?", [newCart.id_user, newCart.id_flower], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // Nếu có, thì cập nhật quantity
      const newQuantity = +res[0].quantity + +newCart.quantity;

      if (newQuantity < 0) {
        // Trả về lỗi nếu newQuantity < 0
        console.log("Quantity cannot be less than 0");
        result({ kind: "invalid_quantity", message: "Quantity cannot be less than 0" }, null);
        return;
      } else if (newQuantity === 0) {
        // Nếu newQuantity = 0 thì xóa dòng
        Cart.remove(res[0].id, result);
        return;
      }

      sql.query("UPDATE cart SET quantity = ? WHERE id_user = ? AND id_flower = ?", [newQuantity, newCart.id_user, newCart.id_flower], (err, resUpdate) => {
        if (err) {
          console.log("error updating cart: ", err);
          result(err, null);
          return;
        }

        console.log("updated cart: ", { id: res[0].id, id_user: newCart.id_user, id_flower: newCart.id_flower, quantity: newQuantity });
        result(null, { id: res[0].id, id_user: newCart.id_user, id_flower: newCart.id_flower, quantity: newQuantity });
      });
    } else {
      if (newCart.quantity <= 0) {
        console.log("Quantity cannot be less than 0");
        result({ kind: "invalid_quantity", message: "Quantity cannot be less than 0" }, null);
        return;
      }
      // Nếu không có, thì tạo mới
      sql.query("INSERT INTO cart SET ?", newCart, (err, resInsert) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created cart: ", { id: resInsert.insertId, ...newCart });
        result(null, { id: resInsert.insertId, ...newCart });
      });
    }
  });
};

// Find a Cart entry by ID
Cart.findById = (id, result) => {
  sql.query(`SELECT * FROM cart WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cart: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found the entry with this ID
    result({ kind: "not_found" }, null);
  });
};

// Retrieve all Cart entries, optionally filtered by user ID
Cart.getAll = (id_user, result) => {
  let query = "SELECT * FROM cart";

  if (id_user) {
    query += ` WHERE id_user = ${id_user}`;
  }

  sql.query(query, async (err, cartRes) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // Nếu có giỏ hàng, tiếp tục lấy thông tin hoa cho mỗi sản phẩm
    if (cartRes.length) {
      let cartsWithFlowerDetails = [];

      // Dùng Promise.all để xử lý tất cả các yêu cầu Flower.findById không đồng bộ
      try {
        cartsWithFlowerDetails = await Promise.all(cartRes.map(async (cartItem) => {
          return new Promise((resolve, reject) => {
            Flower.findById(cartItem.id_flower, (err, flower) => {
              if (err) {
                reject(err);
              } else {
                cartItem.flower = flower; // Thêm thông tin hoa vào đối tượng cart
                resolve(cartItem);
              }
            });
          });
        }));
      } catch (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("carts with flower details: ", cartsWithFlowerDetails);
      result(null, cartsWithFlowerDetails);
    } else {
      // Không có sản phẩm trong giỏ
      result({ kind: "not_found" }, null);
    }
  });
};

// Update a Cart entry by ID
Cart.updateById = (id, cart, result) => {
  sql.query(
    "UPDATE cart SET id_user = ?, id_flower = ? WHERE id = ?",
    [cart.id_user, cart.id_flower, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Not found the entry with this ID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cart: ", { id: id, ...cart });
      result(null, { id: id, ...cart });
    }
  );
};

// Delete a Cart entry by ID
Cart.remove = (id, result) => {
  sql.query("DELETE FROM cart WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Not found the entry with this ID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cart with id: ", id);
    result(null, res);
  });
};

// Delete all Cart entries
Cart.removeAll = result => {
  sql.query("DELETE FROM cart", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} carts`);
    result(null, res);
  });
};

module.exports = Cart;
