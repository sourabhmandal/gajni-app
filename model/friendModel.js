const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  primary_photo_url: { type: String, required: true },
  secondary_photo: [{ photos: String }],
  name: { type: String, required: true },
  description: [{ notes: String }],
  date: { type: Date, default: Date.now },
  place: String,
});
module.exports = mongoose.model("Friend", friendSchema);
