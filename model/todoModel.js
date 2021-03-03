const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    note:String,
    status: String,
    Date:Date(),
});
module.exports = mongoose.model('Friend',friendSchema);