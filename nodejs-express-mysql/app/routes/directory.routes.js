module.exports = app => {
    const directories = require("../controllers/directory.controller.js");

    var router = require("express").Router();

    // Tạo một thư mục mới
    router.post("/", directories.create);

    // Lấy tất cả thư mục
    router.get("/", directories.findAll);

    // Lấy một thư mục theo id
    router.get("/:id", directories.findOne);

    // Cập nhật thông tin một thư mục theo id
    router.put("/:id", directories.update);

    // Xóa một thư mục theo id
    router.delete("/:id", directories.delete);

    // Xóa tất cả thư mục
    router.delete("/", directories.deleteAll);

    app.use('/api/directory', router);
};
