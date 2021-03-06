const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  primary_photo_url: { type: String, required: true },
  name: { type: String, required: true },
  description: {type: String},
  date: { type: Date, default: Date.now },
  place: {type:String},
});
module.exports = mongoose.model("Friend", friendSchema);
