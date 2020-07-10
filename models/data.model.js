const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  name: String,
  price:  String,
  description: String,
});
module.exports = mongoose.model('Data',TaskSchema);