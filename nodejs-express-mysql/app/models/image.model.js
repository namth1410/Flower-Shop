const sql = require("./db.js");

// Constructor
const Image = function(image) {
  this.id_flower = image.id_flower;
  this.image_source = image.image_source;
};

// Tạo một bản ghi mới trong bảng image
Image.create = (newImage, result) => {
  sql.query("INSERT INTO image SET ?", newImage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created image: ", { id: res.insertId, ...newImage });
    result(null, { id: res.insertId, ...newImage });
  });
};

// Tìm bản ghi image theo ID
Image.findById = (id, result) => {
  sql.query(`SELECT * FROM image WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found image: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Không tìm thấy bản ghi với ID này
    result({ kind: "not_found" }, null);
  });
};

// Lấy tất cả các bản ghi trong bảng image
Image.getAll = (id_flower, result) => {
  let query = "SELECT * FROM image";

  if (id_flower) {
    query += ` WHERE id_flower = ${id_flower}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("images: ", res);
    result(null, res);
  });
};

// Cập nhật thông tin một bản ghi theo ID
Image.updateById = (id, image, result) => {
  sql.query(
    "UPDATE image SET id_flower = ?, image_source = ? WHERE id = ?",
    [image.id_flower, image.image_source, id],
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

      console.log("updated image: ", { id: id, ...image });
      result(null, { id: id, ...image });
    }
  );
};

// Xóa một bản ghi theo ID
Image.remove = (id, result) => {
  sql.query("DELETE FROM image WHERE id = ?", id, (err, res) => {
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

    console.log("deleted image with id: ", id);
    result(null, res);
  });
};

// Xóa tất cả các bản ghi trong bảng image
Image.removeAll = result => {
  sql.query("DELETE FROM image", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} images`);
    result(null, res);
  });
};

module.exports = Image;
