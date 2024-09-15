module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    var router = require("express").Router();

    // Create a new Comment
    router.post("/", comments.create);

    // Retrieve all Comments
    router.get("/", comments.findAll);

    // Retrieve a single Comment by id
    router.get("/:id", comments.findOne);

    // Update a Comment identified by the id in the request
    router.put("/:id", comments.update);

    // Delete a Comment with the specified id in the request
    router.delete("/:id", comments.delete);

    // Delete all Comments
    router.delete("/", comments.deleteAll);

    app.use('/api/comment', router);
};
