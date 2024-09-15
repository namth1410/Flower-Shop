module.exports = app => {
    const carts = require("../controllers/cart.controller.js");

    var router = require("express").Router();

    // Tạo một mục giỏ hàng mới
    router.post("/", carts.create);

    // Lấy tất cả các mục giỏ hàng
    router.get("/", carts.findAll);

    // Lấy một mục giỏ hàng theo id
    router.get("/:id", carts.findOne);

    // Cập nhật thông tin một mục giỏ hàng theo id
    router.put("/:id", carts.update);

    // Xóa một mục giỏ hàng theo id
    router.delete("/:id", carts.delete);

    // Xóa tất cả các mục giỏ hàng
    router.delete("/", carts.deleteAll);

    app.use('/api/cart', router);
};
