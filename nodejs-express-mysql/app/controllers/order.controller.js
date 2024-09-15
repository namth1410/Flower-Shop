const Order = require("../models/order.model.js");
const Flower = require("../models/flowers.model.js");

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Order
  const order = new Order({
    id_user: req.body.id_user,
    id_flower: req.body.id_flower,
    id_order: req.body.id_order,
    quantity: req.body.quantity,
    cost: req.body.cost
  });

  // Save Order in the database
  Order.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    else res.send(data);
  });
};

// Retrieve all Orders from the database (with condition).
// exports.findAll = (req, res) => {
//   const id_order = req.query.id_order;

//   Order.getAll(id_order, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving orders."
//       });
//     else res.send(data);
//   });
// };



exports.findByUserIdAndOrderId = (req, res) => {
  const userId = req.params.id_user;
  const orderId = req.params.id_order;

  if (!userId || !orderId) {
    res.status(400).send({
      message: "UserId and OrderId are required!"
    });
    return;
  }

  // Step 1: Find all orders by userId and orderId
  Order.findByUserIdAndOrderId(userId, orderId, (err, orders) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found orders with userId ${userId} and orderId ${orderId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving orders with userId " + userId + " and orderId " + orderId
        });
      }
      return;
    }

    if (orders.length === 0) {
      res.send([]);
      return;
    }

    // Step 2: Create a list of promises to fetch flower information for each order
    const flowerRequests = orders.map(order => {
      return new Promise((resolve, reject) => {
        Flower.findById(order.id_flower, (err, flower) => {
          if (err) {
            reject(err);
          } else {
            resolve({ ...order, flower });
          }
        });
      });
    });

    // Step 3: Wait for all flower information to be fetched and send the combined result
    Promise.all(flowerRequests)
      .then(results => res.send(results))
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving flower information."
        });
      });

})};



// Find a single Order by Id
exports.findOne = (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order with id " + req.params.id
        });
      }
      return;
    }

    // Lấy thông tin flower cho order
    Flower.findById(order.id_flower, (err, flower) => {
      if (err) {
        res.status(500).send({
          message: "Error retrieving Flower with id " + order.id_flower
        });
      } else {
        res.send({ ...order, flower });
      }
    });
  });
};
// Update an Order identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log(req.body);

  Order.updateById(
    req.params.id,
    new Order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Order with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Order with the specified id in the request
exports.delete = (req, res) => {
  Order.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Order with id " + req.params.id
        });
      }
    } else res.send({ message: `Order was deleted successfully!` });
  });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders."
      });
    else res.send({ message: `All Orders were deleted successfully!` });
  });
};

exports.findAll = (req, res) => {
  const id_order = req.query.id_order;

  // Bước 1: Lấy danh sách các order
  Order.getAll(id_order, (err, orders) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders."
      });
      return;
    }

    // Nếu không có orders, trả về ngay
    if (orders.length === 0) {
      res.send([]);
      return;
    }

    // Bước 2: Tạo một danh sách các promise để lấy thông tin flower cho từng order
    const flowerRequests = orders.map(order => {
      return new Promise((resolve, reject) => {
        Flower.findById(order.id_flower, (err, flower) => {
          if (err) {
            reject(err);
          } else {
            resolve({ ...order, flower });
          }
        });
      });
    });

    // Bước 3: Đợi tất cả các promise hoàn tất và trả về kết quả
    Promise.all(flowerRequests)
      .then(results => res.send(results))
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving flowers."
        });
      });
  })};
