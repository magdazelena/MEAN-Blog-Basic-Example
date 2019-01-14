const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const config = require("./config/database");
const path = require("path");
const bodyParser = require("body-parser");
const authentication = require("./routes/authentication")(router);
const blogs = require("./routes/blogs")(router);
const cors = require("cors");
mongoose.Promise = global.Promise;
mongoose.connect(
  config.uri,
  err => {
    if (err) console.log("There is an error " + err);
    else console.log("Connected to db");
  }
);

app.use(
  cors({
    origin: "http://localhost:4200"
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client/dist/"));
app.use("/authentication", authentication);
app.use("/blogs", blogs);
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

app.listen(8080, () => {
  console.log("listening on 8080");
});
