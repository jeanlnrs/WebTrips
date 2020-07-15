const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    name: String,
    description: String,
    price:  String,
    path: String,
    user: String
    /* transactions: [ 
         { 
            item_list: 
            {
                items: 
                [
                    {
                        name: String, 
                        price: String, 
                        currency: String, 
                        quantity: String 
                    }
                ]
            }, 
            amount: 
            {
                currency: String, 
                total: String 
            }, 
            description: String 
        }
    ] */ 
});

mongoose.model('Order',orderSchema);