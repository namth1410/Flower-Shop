const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    account: req.body.account,
    password: req.body.password,
    role: req.body.role || null
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Login function
exports.login = (req, res) => {
  // Validate request
  if (!req.body.account || !req.body.password) {
    return res.status(400).send({
      message: "Account and password can not be empty!"
    });
  }

  // Find user by account
  User.findByAccount(req.body.account, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving the user."
      });
    }

    // If no user found with the given account
    if (!user) {
      return res.status(404).send({
        message: "User not found."
      });
    }

    // Check if password matches
    if (user.password !== req.body.password) {
      return res.status(401).send({
        message: "Invalid password."
      });
    }

    // If credentials are valid, return user data (or a token, if using JWT)
    res.send({
      id: user.id,
      account: user.account,
      role: user.role
    });
  });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const account = req.query.account;

  User.getAll(account, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
