const Directory = require("../models/directory.model.js");

// Create and Save a new Directory
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Directory
  const directory = new Directory({
    name: req.body.name
  });

  // Save Directory in the database
  Directory.create(directory, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Directory."
      });
    else res.send(data);
  });
};

// Retrieve all Directories from the database (with condition).
exports.findAll = (req, res) => {
  Directory.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving directories."
      });
    else res.send(data);
  });
};

// Find a single Directory by Id
exports.findOne = (req, res) => {
  Directory.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Directory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Directory with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Directory identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Directory.updateById(
    req.params.id,
    new Directory(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Directory with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Directory with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Directory with the specified id in the request
exports.delete = (req, res) => {
  Directory.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Directory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Directory with id " + req.params.id
        });
      }
    } else res.send({ message: `Directory was deleted successfully!` });
  });
};

// Delete all Directories from the database.
exports.deleteAll = (req, res) => {
  Directory.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all directories."
      });
    else res.send({ message: `All Directories were deleted successfully!` });
  });
};
