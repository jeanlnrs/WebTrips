const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    name: String,
    description: String,
    price:  String,
    path: String,
    user: String
});

mongoose.model('Order',orderSchema);