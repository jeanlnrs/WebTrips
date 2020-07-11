require('./models/db');
const express= require('express');
const path= require('path');
const exphbs=require('express-handlebars');
const methodOverride = require('method-override');
const bodyparser= require('body-parser');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const orderController= require('./controllers/orderController');
const dataController= require('./controllers/dataController');

// intializations
var app=express();

//Settings
app.set('port', process.env.PORT || 3000);
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

// middlewares
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('path'));
app.set('view engine','hbs');
app.use(methodOverride('_method'));

// start
app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});

// routes
app.use('/',orderController);
app.use('/',dataController);