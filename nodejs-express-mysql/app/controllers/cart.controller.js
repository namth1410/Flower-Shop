const Cart = require("../models/cart.model.js");

// Create and Save a new Cart entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Cart entry
  const cart = new Cart({
    id_user: req.body.id_user,
    id_flower: req.body.id_flower
  });

  // Save Cart in the database
  Cart.create(cart, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Cart."
      });
    else res.send(data);
  });
};

// Retrieve all Cart entries from the database (with condition).
exports.findAll = (req, res) => {
  const id_user = req.query.id_user;

  Cart.getAll(id_user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving carts."
      });
    else res.send(data);
  });
};

// Find a single Cart entry by Id
exports.findOne = (req, res) => {
  Cart.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cart with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cart with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Cart entry identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Cart.updateById(
    req.params.id,
    new Cart(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cart with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cart with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Cart entry with the specified id in the request
exports.delete = (req, res) => {
  Cart.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cart with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cart with id " + req.params.id
        });
      }
    } else res.send({ message: `Cart was deleted successfully!` });
  });
};

// Delete all Cart entries from the database.
exports.deleteAll = (req, res) => {
  Cart.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all carts."
      });
    else res.send({ message: `All Carts were deleted successfully!` });
  });
};
