module.exports = app => {
    const images = require("../controllers/image.controller.js");
  
    var router = require("express").Router();
  
    // Tạo một bản ghi hình ảnh mới
    router.post("/", images.create);
  
    // Lấy tất cả các bản ghi hình ảnh
    router.get("/", images.findAll);
  
    // Lấy một bản ghi hình ảnh theo id
    router.get("/:id", images.findOne);
  
    // Cập nhật thông tin một bản ghi hình ảnh theo id
    router.put("/:id", images.update);
  
    // Xóa một bản ghi hình ảnh theo id
    router.delete("/:id", images.delete);
  
    // Xóa tất cả các bản ghi hình ảnh
    router.delete("/", images.deleteAll);
  
    app.use('/api/image', router);
};
