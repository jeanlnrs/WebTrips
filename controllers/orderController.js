// Require
const express= require('express');
const mongoose= require('mongoose');
const Order= mongoose.model('Order');
const Data = require('../models/data.model');
const paypal = require('paypal-rest-sdk');

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
  insertToCart(req,res);
});

router.post('/cart', isAuthenticated, (req,res)=>{
  insertPayment(req,res);
});

// Functions
function insertToCart(req,res) {
  var order=new Order();
  order.name = req.body.name;
  order.description = req.body.description;
  order.price = req.body.price;
  order.path = req.body.path;
  order.user = req.user.id; //id
  order.save((err,doc)=>{
    if (!err) {
            console.log('order: '+order);
    } else {
        console.log('Error insertOrder: '+err);
    }
});
}

function insertPayment(req,res) {
  var name = "Corinthians";
  var currency = "USD";
  var description = "21 savage";
  var total = req.body.total;
  var cant = req.body.cant;
  var order = new Order();
  var arrayItems = [{name: name, price: total, currency: currency, quantity: cant}];
  var arrayAmount = {currency : currency, total: total};
  order.transactions = [{item_list: {items : arrayItems}, amount: arrayAmount, description: description}];
  globalAmount = total;
  order.save((err,doc)=>{
    if (!err) {
            
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
              quantity: 1
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

    } else {
        console.log('Error insertOrder: '+err);
    }
});
}

module.exports=router;