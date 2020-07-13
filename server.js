require('./models/db');
const express= require('express');
const path= require('path');
const exphbs=require('express-handlebars');
const methodOverride = require('method-override');
const bodyparser= require('body-parser');
const multer = require('multer');
const passport = require('passport');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

// intializations
var app=express();
const orderController= require('./controllers/orderController');
const dataController= require('./controllers/dataController');
const userController= require('./controllers/userController');
require('./config/passport');

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
app.set('view engine','hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('path'));

const MongoStore = connectMongo(session);
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  //store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// start
app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});

// routes
app.use('/',orderController);
app.use('/',dataController);
app.use('/',userController);