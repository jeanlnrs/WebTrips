require('./models/db');
const express= require('express');
const path= require('path');
const exphbs=require('express-handlebars');
const methodOverride = require('method-override');
const bodyparser= require('body-parser');
const orderController= require('./controllers/orderController');
const dataController= require('./controllers/dataController');

var app=express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'/public')));
app.set('views',path.join(__dirname,'views'));
app.engine('hbs',exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname+'/views/'
}));
app.set('view engine','hbs');
app.use(methodOverride('_method'));
app.listen(4000,()=>{
    console.log('Server on port: 4000');
});
app.use('/',orderController);
app.use('/',dataController);