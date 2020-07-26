// Require
const express= require('express');
const mongoose= require('mongoose');
const Order= mongoose.model('Order');
const Data = require('../models/data.model');
const paypal = require('paypal-rest-sdk');
var Promise = require('bluebird');

//Config
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AaSDE6qINg9wWMlZNBn1-2hl2ykTXot7weQxtMCUeBqNP_jYjp2kYwt64AeGiHrbh1U_sG57m2AzT87B',
    'client_secret': 'EBe_1tSZYvwKwZBSgwkdNDsedg6BjIE5trrtqtZHqlJPsCoWac05feps9NeArEaP35j7vgr-l_VUS-0i'
  });

  isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'Iniciar sesion para continuar');
    res.redirect('/users/signin');
  };

var router= express.Router();
var globalAmount
var arraySuccess = [];
mongoose.set('useFindAndModify',false);


//GET
router.get('/',(req,res)=>{
  Data.find((err,docs)=>{
      if (!err) {
          res.render("index",{
              data:docs
          });
      } else {
           console.log('Error in Data: '+ err);    
      }
  });
});

router.get('/adm', (req,res)=>{
  res.render('admin');
});

router.get('/search',(req,res)=>{
  Data.find((err,docs)=>{
      if (!err) {
          res.render("search",{
              data:docs
          });
      } else {
           console.log('Error in Data: '+ err);    
      }
  });
});

router.get('/cart', isAuthenticated, (req,res)=>{
    res.render('cart');
});

 router.get('/orders',(req,res)=>{
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": globalAmount
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
    console.log(payment);
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      for (var index=0; index < arraySuccess.length; index++){
        var order = new Order();
        order.name = await arraySuccess[index].name;
        order.description = await arraySuccess[index].description;
        order.price = await arraySuccess[index].price;
        order.path = await arraySuccess[index].path;
        order.user = req.user.id; //id
        await order.save();
      }
      arraySuccess=[];
      console.log(JSON.stringify(payment));
      findOrders (req,res);
     }
  });
});

router.get('/success', isAuthenticated, (req, res) => {
    findOrders (req,res);
  })

// POST
router.post('/addToCart', isAuthenticated, (req,res)=>{
  arraySuccess.push(req.body);
});

router.post('/cart', isAuthenticated, (req,res)=>{
  insertPayment(req,res);
});

// Function
function insertPayment(req,res) {
  var name = "";
  var currency = "USD";
  var description = "";
  var total = req.body.total;
  globalAmount = req.body.total;
  var cant = 1;     
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal"
        },
        redirect_urls: {
          return_url: "http://localhost:3000/orders",
          cancel_url: "http://localhost:3000/"
        },
        transactions: [{
          item_list: {
            items: [{
              name: name,
              price: total,
              currency: currency,
              quantity: cant
            }]
          },
          amount: {
            currency: currency,
            total: globalAmount
          },
          description: description
        }]
      };
      
      paypal.payment.create(create_payment_json, function (error, payment) {

        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              res.redirect(payment.links[i].href);
            }
          }
        }
      });
}

function findOrders (req,res){
  Order.find({user: req.user.id},(err,docs)=>{
    if (!err) {
        res.render("success",{
            order:docs
        });
    } else {
         console.log('Error in order: '+ err);    
    }
});
}

module.exports=router;