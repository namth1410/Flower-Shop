const Flower = require("../models/flowers.model.js");

// Create and Save a new Flower and Image
exports.create = (req, res) => {
  // Validate request
  if (!req.body || !req.body.image_source) {
    res.status(400).send({
      message: "Content and image source cannot be empty!"
    });
    return;
  }

  // Create a Flower
  const flower = new Flower({
    name: req.body.name,
    cost: req.body.cost,
    description: req.body.description,
    tag: req.body.tag || null
  });

  // Save Flower in the database
  Flower.create(flower, (err, flowerData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Flower."
      });
      return;
    }

    // After the Flower is created, create an Image with the flower's ID
    const image = new Image({
      id_flower: flowerData.id,  // Use the ID from the created flower
      image_source: req.body.image_source
    });

    // Save Image in the database
    Image.create(image, (err, imageData) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Image."
        });
      } else {
        res.send({ flower: flowerData, image: imageData });
      }
    });
  });
};


// Tìm hoa theo nhiều id tag từ JSON request
exports.findByTagIds = (req, res) => {
  // Lấy chuỗi các id tag từ request body
  const { tagIds } = req.body;

  if (!tagIds || tagIds.length === 0) {
    res.status(400).send({
      message: "Chưa cung cấp tagIds."
    });
    return;
  }

  // Gọi hàm model để tìm kiếm với mảng tagIds
  Flower.findByTagIds(tagIds, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy hoa với các id tag ${tagIds}.`
        });
      } else {
        res.status(500).send({
          message: `Có lỗi xảy ra khi tìm hoa với các id tag ${tagIds}.`
        });
      }
    } else {
      res.send(data);
    }
  });
};


// Retrieve all Flowers from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Flower.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flowers."
      });
    else res.send(data);
  });
};

// Find a single Flower by Id
exports.findOne = (req, res) => {
  Flower.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flower with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flower with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Flower identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Flower.updateById(
    req.params.id,
    new Flower(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Flower with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Flower with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Flower with the specified id in the request
exports.delete = (req, res) => {
  Flower.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flower with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Flower with id " + req.params.id
        });
      }
    } else res.send({ message: `Flower was deleted successfully!` });
  });
};

// Delete all Flowers from the database.
exports.deleteAll = (req, res) => {
  Flower.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all flowers."
      });
    else res.send({ message: `All Flowers were deleted successfully!` });
  });
};
