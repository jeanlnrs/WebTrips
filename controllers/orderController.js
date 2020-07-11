// Require
const express= require('express');
const mongoose= require('mongoose');
const Order= mongoose.model('Order');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AaSDE6qINg9wWMlZNBn1-2hl2ykTXot7weQxtMCUeBqNP_jYjp2kYwt64AeGiHrbh1U_sG57m2AzT87B',
    'client_secret': 'EBe_1tSZYvwKwZBSgwkdNDsedg6BjIE5trrtqtZHqlJPsCoWac05feps9NeArEaP35j7vgr-l_VUS-0i'
  });

var router= express.Router();
var globalAmount
mongoose.set('useFindAndModify',false);
// Router
router.get('/',(req,res)=>{
    res.render('menu');
});
router.get('/cart',(req,res)=>{
    res.render('cart');
});
router.get('/orders',(req,res)=>{
    res.render('orders');
});
router.get('/admin',(req,res)=>{
    Order.find((err,docs)=>{
        if (!err) {
            res.render("admin",{
                order:docs
            });
        } else {
             console.log('Error in order: '+ err);    
        }
    });
});
router.get('/order/:id',(req,res)=>{
    Order.findById(req.params.id,(err,doc)=>{
        if (!err) {
                res.render("orders",{order:doc});
        } else {
            console.log('Error findbyId: '+ err);  
        }
    });
});
router.get('/order/delete/:id',(req,res)=>{
    Order.findByIdAndRemove(req.params.id,(err,doc)=>{
        if (!err) {
                res.redirect('/admin');
        } else {
            console.log('Error in delete: '+ err);  
        }
    });
});
router.get('/success', (req, res) => {
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
        res.render('success');
      }
    });
  });
// POST
router.post('/cart',(req,res)=>{
    insertPayment(req,res);
    //disque(req,res);
});
router.post('/order',(req,res)=>{
    updateOrder(req,res);
});

// Functions
function updateOrder(req,res) {
    Order.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if (!err) {
                res.redirect('/admin');
        } else {
                console.log('Update error '+err);
        }
    });
}
function insertOrder(req,res) {
    var d= new Date();
    var t=d.getTime();
    var counter= t;
    counter+=1;
    var order=new Order();
    order.total=req.body.total;
    order.cant=req.body.cant;
    order.order=counter;
    order.save((err,doc)=>{
        if (!err) {
                console.log('order: '+order);
                //res.redirect('/admin');
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

function disque(req,res) {
    const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal"
        },
        redirect_urls: {
          return_url: "http://localhost:4000/success",
          cancel_url: "http://localhost:4000/"
        },
        transactions: [{
          item_list: {
            items: [{
              name: "Corinthians",
              price: "25",
              currency: "USD",
              quantity: 1
            }]
          },
          amount: {
            currency: "USD",
            total: "25"
          },
          description: "The best football team EVER!"
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

