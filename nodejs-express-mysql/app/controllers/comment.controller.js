const Comment = require("../models/comment.model.js");

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Comment
  const comment = new Comment({
    id_flower: req.body.id_flower,
    comment: req.body.comment,
    name: req.body.name,
    email: req.body.email
  });

  // Save Comment in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    else res.send(data);
  });
};

// Retrieve all Comments from the database (with condition).
exports.findAll = (req, res) => {
  const id_flower = req.query.id_flower;

  Comment.getAll(id_flower, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    else res.send(data);
  });
};


// Find a single Comment by Id
exports.findOne = (req, res) => {
  Comment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Comment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Comment identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log(req.body);

  Comment.updateById(
    req.params.id,
    new Comment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Comment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  Comment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Comment with id " + req.params.id
        });
      }
    } else res.send({ message: `Comment was deleted successfully!` });
  });
};

// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
  Comment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all comments."
      });
    else res.send({ message: `All Comments were deleted successfully!` });
  });
};
