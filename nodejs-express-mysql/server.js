require("dotenv").config();

const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application 1." });
});

require("./app/routes/flowers.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/directory.routes.js")(app);
require("./app/routes/comment.routes.js")(app);
require("./app/routes/cart.routes.js")(app);
require("./app/routes/image.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
