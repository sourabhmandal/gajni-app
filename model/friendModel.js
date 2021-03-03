const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  primary_photo: { type: String, required: true },
  secondary_photo: [{ photos: String }],
  name: String,
  last_visit: [],
  description: [{ notes: String }],
  date: { type: Date, default: Date.now },
  place: String,
});
module.exports = mongoose.model("Friend", friendSchema);
