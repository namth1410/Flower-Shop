module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Tạo một người dùng mới
    router.post("/", users.create);

    // login
    router.post("/login", users.login);
  
    // Lấy tất cả người dùng
    router.get("/", users.findAll);
  
    // Lấy một người dùng theo id
    router.get("/:id", users.findOne);
  
    // Cập nhật thông tin một người dùng theo id
    router.put("/:id", users.update);
  
    // Xóa một người dùng theo id
    router.delete("/:id", users.delete);
  
    // Xóa tất cả người dùng
    router.delete("/", users.deleteAll);
  
    app.use('/api/user', router);
  };
  