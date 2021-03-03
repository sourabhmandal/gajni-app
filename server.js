const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const friendRouter = require("./routes/Friends");
const todoRouter = require("./routes/Todos");
const mongoose = require("mongoose");
const KEYS = require("./keys");

// ROUTES
// friends routes

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Hello World! from API HOME");
});
app.post("/api", (req, res) => {
  //res.json(req.body);
});
app.use("/friends", friendRouter);
app.use("/todo", todoRouter);

mongoose
  .connect(KEYS.keys.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(port, () => {
      console.log(
        "\x1b[6;30;42m" +
          "GAZINI app listening at http://localhost:" +
          port +
          "\x1b[0m"
      );
    })
  );
