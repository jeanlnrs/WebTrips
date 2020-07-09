const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    transactions: [ 
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
    ] 
});

mongoose.model('Order',orderSchema);