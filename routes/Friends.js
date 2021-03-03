const express = require("express");
let router = express.Router({ mergeParams: true });
const Friend = require("../model/friendModel");
//list of all friends
router.get("/", function (req, res) {
  Friend.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//find a friends
router.get("/:friend_name", function (req, res) {
  Friend.find({ name: req.params.friend_name })
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

//add a new friend
router.post("/", function (req, res) {
  let Newuser = new Friend(req.body); // this is modal object.

  Newuser.save()
    .then((data) => {
      res.json({ status: "saved", data: data });
    })
    .catch((err) => {
      res.json(err);
    });
});

//update a friend
router.put("/", async function (req, res) {
  const update = req.body;
  const filter = req.query;

  Friend.findOneAndUpdate(req.params.filter, req.params.update, {
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
router.delete("/:friend/", function (req, res) {
  Friend.findOneAndDelete({ name: req.params.friend })
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
