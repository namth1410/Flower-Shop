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

    // xóa đơn hàng theo id_user và id_order
    router.delete("/:id_user/:id_order", orders.deleteByUserIdAndOrderId);

    // update status cho các đơn hàng theo id_user và id_order
    router.put("/:id_user/:id_order", orders.updateByUserIdAndOrderId)
  
    app.use('/api/order', router);
  };
  