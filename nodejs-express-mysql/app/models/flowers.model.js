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

// Tìm hoa theo ID và lấy thêm ảnh
Flower.findById = (id, result) => {
  // Tìm hoa theo ID
  sql.query(`SELECT * FROM flower WHERE idflower = ?`, [id], (err, flowerRes) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (flowerRes.length) {
      const flower = flowerRes[0];
      // Tìm các ảnh liên quan đến hoa
      sql.query(`SELECT * FROM image WHERE id_flower = ?`, [id], (err, imageRes) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        // Thêm trường image vào kết quả
        flower.image = imageRes;
        console.log("found flower: ", flower);
        result(null, flower);
      });
    } else {
      // Không tìm thấy bản ghi với ID này
      result({ kind: "not_found" }, null);
    }
  });
};

// Lấy tất cả các bản ghi trong bảng flower, có thể lọc theo name và thêm ảnh
Flower.getAll = (name, result) => {
  let query = "SELECT * FROM flower";

  if (name) {
    query += ` WHERE name LIKE ?`;
  }

  sql.query(query, name ? [`%${name}%`] : [], (err, flowerRes) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    const flowers = flowerRes;
    // Lấy các ID hoa để tìm ảnh
    const flowerIds = flowers.map(flower => flower.idflower);

    if (flowerIds.length > 0) {
      // Tìm các ảnh liên quan đến các hoa
      sql.query(`SELECT * FROM image WHERE id_flower IN (?)`, [flowerIds], (err, imageRes) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        // Tạo một bản đồ để ánh xạ hoa với ảnh của nó
        const imageMap = imageRes.reduce((acc, image) => {
          if (!acc[image.id_flower]) {
            acc[image.id_flower] = [];
          }
          acc[image.id_flower].push(image);
          return acc;
        }, {});

        // Thêm trường image vào từng hoa
        flowers.forEach(flower => {
          flower.image = imageMap[flower.idflower] || [];
        });

        console.log("flowers: ", flowers);
        result(null, flowers);
      });
    } else {
      // Nếu không có hoa, trả về danh sách hoa rỗng
      result(null, flowers);
    }
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

// Tìm hoa theo danh sách tagIds và lấy thêm ảnh
Flower.findByTagIds = (tagIds, result) => {
  // Tạo điều kiện WHERE để kiểm tra các tag chứa chính xác từng id trong mảng tagIds
  const conditions = tagIds.map(() => `tag REGEXP ?`).join(' OR ');

  // Tạo biểu thức REGEXP cho từng id trong tagIds
  const regexValues = tagIds.map(id => `(^|,)${id}(,|$)`);

  // Truy vấn SQL sử dụng REGEXP để kiểm tra sự tồn tại của từng tag
  const query = `SELECT * FROM flower WHERE ${conditions}`;

  sql.query(query, regexValues, (err, flowerRes) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (flowerRes.length) {
      const flowers = flowerRes;
      // Lấy các ID hoa để tìm ảnh
      const flowerIds = flowers.map(flower => flower.idflower);

      if (flowerIds.length > 0) {
        // Tìm các ảnh liên quan đến các hoa
        sql.query(`SELECT * FROM image WHERE id_flower IN (?)`, [flowerIds], (err, imageRes) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          // Tạo một bản đồ để ánh xạ hoa với ảnh của nó
          const imageMap = imageRes.reduce((acc, image) => {
            if (!acc[image.id_flower]) {
              acc[image.id_flower] = [];
            }
            acc[image.id_flower].push(image);
            return acc;
          }, {});

          // Thêm trường image vào từng hoa
          flowers.forEach(flower => {
            flower.image = imageMap[flower.idflower] || [];
          });

          console.log("found flowers: ", flowers);
          result(null, flowers);
        });
      } else {
        // Nếu không có hoa, trả về danh sách hoa rỗng
        result(null, flowers);
      }
    } else {
      // Không tìm thấy hoa với các tag này
      result({ kind: "not_found" }, null);
    }
  });
};

module.exports = Flower;
