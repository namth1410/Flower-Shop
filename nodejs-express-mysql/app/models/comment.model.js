const sql = require("./db.js");

// Constructor
const Comment = function(comment) {
  this.id_flower = comment.id_flower;
  this.comment = comment.comment;
  this.name = comment.name;
  this.email = comment.email;
};

// Tạo một bản ghi mới trong bảng comment
Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comment SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};

// Tìm bản ghi comment theo ID
Comment.findById = (id, result) => {
  sql.query(`SELECT * FROM comment WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found comment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Không tìm thấy bản ghi với ID này
    result({ kind: "not_found" }, null);
  });
};

// Lấy tất cả các bản ghi trong bảng comment, có thể lọc theo id_flower
Comment.getAll = (id_flower, result) => {
  let query = "SELECT * FROM comment";

  if (id_flower) {
    query += ` WHERE id_flower = ${id_flower}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("comments: ", res);
    result(null, res);
  });
};

// Cập nhật thông tin một bản ghi theo ID
Comment.updateById = (id, comment, result) => {
  sql.query(
    "UPDATE comment SET id_flower = ?, comment = ?, name = ?, email = ? WHERE id = ?",
    [comment.id_flower, comment.comment, comment.name, comment.email, id],
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

      console.log("updated comment: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};

// Xóa một bản ghi theo ID
Comment.remove = (id, result) => {
  sql.query("DELETE FROM comment WHERE id = ?", id, (err, res) => {
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

    console.log("deleted comment with id: ", id);
    result(null, res);
  });
};

// Xóa tất cả các bản ghi trong bảng comment
Comment.removeAll = result => {
  sql.query("DELETE FROM comment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} comments`);
    result(null, res);
  });
};

module.exports = Comment;
