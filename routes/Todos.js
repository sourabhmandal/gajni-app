const express = require("express");
let router = express.Router({ mergeParams: true });
const Todo = require("../model/todoModel");

//list of all friends
router.get("/", function (req, res) {
  Todo.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//add a new friend
router.post("/", function (req, res) {
  Todo.find({ note: req.params.note })
    .then((data) => {
      if (data.length === 0) {
        res.json({ status: "No record found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//update a friend
router.put("/", async function (req, res) {
  const update = req.body;
  const filter = req.query;

  Todo.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  })
    .then((friend) => {
      if (friend) {
        res.json({ success: true, data: friend });
      } else {
        res.json({ success: false, data: "no such user exist" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

//remove a friend
router.delete("/", function (req, res) {
  Todo.findOneAndDelete({ note: req.params.note })
    .then((docs) => {
      if (docs) {
        res.json({ success: true, data: docs });
      } else {
        res.json({ success: false, data: "no such user exist" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
