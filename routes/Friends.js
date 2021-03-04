const express = require("express");
let router = express.Router({ mergeParams: true });
const Friend = require("../model/friendModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, next) {
    next(null, "./uploads");
  },
  filename: function (req, file, next) {
    next(null, (Math.random() * 1000000).toString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

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
router.post("/", upload.single("primary_photo"), function (req, res) {
  console.log(req.file);
  let Newuser = new Friend({
    primary_photo_url:
      (process.env.port || "http://localhost:3000/") +
      "uploads/" +
      req.file.filename,
    name: req.body.name,
    description: req.body.notes,
    date: Date.now(),
    place: req.body.place,
  });
  let imagefile = req.file;
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
