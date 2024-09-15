const sql = require("./db.js");

// Constructor
const Flower = function(flower) {
  this.name = flower.name;
  this.cost = flower.cost;
  this.description = flower.description;
  this.tag = flower.tag;
};

// Tạo một bản ghi mới trong bảng flower
Flower.create = (newFlower, result) => {
  sql.query("INSERT INTO flower SET ?", newFlower, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created flower: ", { id: res.insertId, ...newFlower });
    result(null, { id: res.insertId, ...newFlower });
  });
};

// Tìm bản ghi flower theo ID
Flower.findById = (id, result) => {
  sql.query(`SELECT * FROM flower WHERE idflower = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found flower: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Không tìm thấy bản ghi với ID này
    result({ kind: "not_found" }, null);
  });
};

// Lấy tất cả các bản ghi trong bảng flower, có thể lọc theo name
Flower.getAll = (name, result) => {
  let query = "SELECT * FROM flower";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("flowers: ", res);
    result(null, res);
  });
};

// Cập nhật thông tin một bản ghi theo ID
Flower.updateById = (id, flower, result) => {
  sql.query(
    "UPDATE flower SET name = ?, cost = ?, description = ?, tag = ? WHERE idflower = ?",
    [flower.name, flower.cost, flower.description, flower.tag, id],
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

      console.log("updated flower: ", { id: id, ...flower });
      result(null, { id: id, ...flower });
    }
  );
};

// Xóa một bản ghi theo ID
Flower.remove = (id, result) => {
  sql.query("DELETE FROM flower WHERE idflower = ?", id, (err, res) => {
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

    console.log("deleted flower with id: ", id);
    result(null, res);
  });
};

// Xóa tất cả các bản ghi trong bảng flower
Flower.removeAll = result => {
  sql.query("DELETE FROM flower", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} flowers`);
    result(null, res);
  });
};

module.exports = Flower;
