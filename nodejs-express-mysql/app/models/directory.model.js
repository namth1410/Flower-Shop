const sql = require("./db.js");

// Constructor
const Directory = function(directory) {
  this.name = directory.name;
};

// Tạo một bản ghi mới trong bảng directory
Directory.create = (newDirectory, result) => {
  sql.query("INSERT INTO `directory` SET ?", newDirectory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created directory: ", { id: res.insertId, ...newDirectory });
    result(null, { id: res.insertId, ...newDirectory });
  });
};

// Tìm bản ghi directory theo ID
Directory.findById = (id, result) => {
  sql.query(`SELECT * FROM \`directory\` WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found directory: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Không tìm thấy bản ghi với ID này
    result({ kind: "not_found" }, null);
  });
};

// Lấy tất cả các bản ghi trong bảng directory
Directory.getAll = (result) => {
  sql.query("SELECT * FROM `directory`", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("directories: ", res);
    result(null, res);
  });
};

// Cập nhật thông tin một bản ghi theo ID
Directory.updateById = (id, directory, result) => {
  sql.query(
    "UPDATE `directory` SET name = ? WHERE id = ?",
    [directory.name, id],
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

      console.log("updated directory: ", { id: id, ...directory });
      result(null, { id: id, ...directory });
    }
  );
};

// Xóa một bản ghi theo ID
Directory.remove = (id, result) => {
  sql.query("DELETE FROM `directory` WHERE id = ?", id, (err, res) => {
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

    console.log("deleted directory with id: ", id);
    result(null, res);
  });
};

// Xóa tất cả các bản ghi trong bảng directory
Directory.removeAll = (result) => {
  sql.query("DELETE FROM `directory`", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} directories`);
    result(null, res);
  });
};

module.exports = Directory;
