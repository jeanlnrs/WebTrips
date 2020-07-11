// Require
const express= require('express');
const Data = require('../models/data.model');
var router= express.Router();

router.get('/adm',(req,res)=>{
    Data.find((err,docs)=>{
        if (!err) {
            res.render("adm",{
                data:docs
            });
        } else {
             console.log('Error in Data: '+ err);    
        }
    });
});

router.post('/adm/add', async (req,res)=>{
    const data = new Data(req.body);
    await data.save();
    res.redirect('/adm');
});

module.exports=router;