const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  name: String,
  category: String,
  description: String,
  price:  String,
  path: String,
  path1: String,
  path2: String,
  path3: String,
  path4: String
});
module.exports = mongoose.model('Data',TaskSchema);