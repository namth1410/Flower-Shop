const sql = require("./db.js");

// Constructor
const Cart = function(cart) {
  this.id_user = cart.id_user;
  this.id_flower = cart.id_flower;
};

// Create a new Cart entry
Cart.create = (newCart, result) => {
  sql.query("INSERT INTO cart SET ?", newCart, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cart: ", { id: res.insertId, ...newCart });
    result(null, { id: res.insertId, ...newCart });
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

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("carts: ", res);
    result(null, res);
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
