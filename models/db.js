const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.duc0h.mongodb.net/<dbname>?retryWrites=true&w=majority',{useNewUrlParser:true},(err)=>{
    if (!err) {
        console.log('MongoDB connected');
    } else {
        console.log('error: '+err);
    }
});
require('./order.model');
require('./data.model');