const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
/* const mongoose = require("mongoose");
require("./config/mongodb"); */


app.db = db;
app.use(bodyParser.json());
app.use(cors());
/* app.mongoose = mongoose; */

consign()
  .include("./config/passaport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
/*   .then("./schedule") */
  .then("./config/routes.js")
  .into(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Backend server is listening on port "+port);
});
