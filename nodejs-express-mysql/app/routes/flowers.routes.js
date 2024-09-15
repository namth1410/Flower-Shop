module.exports = app => {
  const flowers = require("../controllers/flowers.controller.js");

  var router = require("express").Router();

  // Tạo một bông hoa mới
  router.post("/", flowers.create);

  // Lấy tất cả các bông hoa
  router.get("/", flowers.findAll);

  // Lấy một bông hoa theo id
  router.get("/:id", flowers.findOne);

  // Cập nhật thông tin một bông hoa theo id
  router.put("/:id", flowers.update);

  // Xóa một bông hoa theo id
  router.delete("/:id", flowers.delete);

  // Xóa tất cả các bông hoa
  router.delete("/", flowers.deleteAll);

  router.post("/tags", flowers.findByTagIds);

  app.use('/api/flowers', router);
};
