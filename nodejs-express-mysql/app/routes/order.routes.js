module.exports = app => {
    const orders = require("../controllers/order.controller.js");
  
    var router = require("express").Router();
  
    // Tạo một đơn hàng mới
    router.post("/", orders.create);
  
    // Lấy tất cả các đơn hàng
    router.get("/", orders.findAll);
  
    // Lấy một đơn hàng theo id
    router.get("/:id", orders.findOne);
  
    // Cập nhật thông tin một đơn hàng theo id
    router.put("/:id", orders.update);
  
    // Xóa một đơn hàng theo id
    router.delete("/:id", orders.delete);
  
    // Xóa tất cả các đơn hàng
    router.delete("/", orders.deleteAll);

    // Tìm đơn hàng theo id_user và id_order
    router.get("/:id_user/:id_order", orders.findByUserIdAndOrderId);
  
    app.use('/api/order', router);
  };
  