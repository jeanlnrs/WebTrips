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
router.get('/adm/edit/:id',async (req,res)=>{
    Data.findById(req.params.id,(err,doc)=>{
        if (!err) {
                res.render("edit",{
                    data:doc
                });
        } else {
            console.log('Error findbyId: '+ err);  
        }
    });
});
router.put('/adm/data-edit/:id',async (req,res)=>{
    const {name, description, price} = req.body;
    await Data.findByIdAndUpdate(req.params.id, {name, description, price});
    res.redirect('/adm');
});

module.exports=router;