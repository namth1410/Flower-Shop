const Image = require("../models/image.model.js");

// Create and Save a new Image
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Image
  const image = new Image({
    id_flower: req.body.id_flower,
    image_source: req.body.image_source
  });

  // Save Image in the database
  Image.create(image, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Image."
      });
    else res.send(data);
  });
};

// Retrieve all Images from the database (with condition).
exports.findAll = (req, res) => {
  const id_flower = req.query.id_flower;

  Image.getAll(id_flower, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving images."
      });
    else res.send(data);
  });
};

// Find a single Image by Id
exports.findOne = (req, res) => {
  Image.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Image with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Image with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update an Image identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log(req.body);

  Image.updateById(
    req.params.id,
    new Image(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Image with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Image with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Image with the specified id in the request
exports.delete = (req, res) => {
  Image.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Image with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Image with id " + req.params.id
        });
      }
    } else res.send({ message: `Image was deleted successfully!` });
  });
};

// Delete all Images from the database.
exports.deleteAll = (req, res) => {
  Image.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all images."
      });
    else res.send({ message: `All Images were deleted successfully!` });
  });
};
