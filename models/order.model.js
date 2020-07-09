const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    intent: String,
    payer: 
    { 
        payment_method: String 
    },
    redirect_urls: 
    { 
        return_url:String, 
        cancel_url:String 
    },
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