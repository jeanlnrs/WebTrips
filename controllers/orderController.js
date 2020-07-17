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

router.get('/cart', isAuthenticated, (req,res)=>{
    res.render('cart');
});

 router.get('/orders',(req,res)=>{
    res.render('orders');
});
router.get('/success',(req,res)=>{
    Order.find({user: req.user.id},(err,docs)=>{
        if (!err) {
            res.render("success",{
                order:docs
            });
        } else {
             console.log('Error in order: '+ err);    
        }
    });
});
router.get('/success', isAuthenticated, (req, res) => {
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
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.render('orders');
       }
    });
  })

// POST
router.post('/addToCart', isAuthenticated, (req,res)=>{
  arraySuccess.push(req.body);
});

router.post('/cart', isAuthenticated, (req,res)=>{
  //insertPayment(req,res);
  insertToCart(req,res);
});

// Functions
async function insertToCart(req,res) {
    for (var i=0; i < arraySuccess.length; i++){
    var order = new Order();
    order.name = await arraySuccess[i].name;
    order.description = await arraySuccess[i].description;
    order.price = await arraySuccess[i].price;
    order.path = await arraySuccess[i].path;
    order.user = req.user.id; //id
    await order.save();
  }
  res.redirect("/success");
  console.log('Arreglo antes de ' + arraySuccess);
  arraySuccess=[];
  console.log('Arreglo despues de ' + arraySuccess);
}

function insertPayment(req,res) {
  var name = "";
  var currency = "USD";
  var description = "";
  var total = req.body.total;
  var cant = 1;            
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal"
        },
        redirect_urls: {
          return_url: "http://localhost:3000/success",
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
            total: total
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

module.exports=router;