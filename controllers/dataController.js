// Require
const express= require('express');
const { unlink } = require('fs-extra');
const path = require('path');
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
    const data = new Data();
    data.name = req.body.name;
    data.price = req.body.price;
    data.description = req.body.description;
    data.path = '/img/uploads/' + req.file.filename;
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
    const {name, description, price, path} = req.body;
    await Data.findByIdAndUpdate(req.params.id, {name, description, price, path});
    res.redirect('/adm');
});
router.get('/adm/delete/:id',async (req,res)=>{
    const { id } = req.params;
    const imageDeleted = await Data.findByIdAndDelete(id);
    await unlink(path.resolve('./public' + imageDeleted.path));
    res.redirect('/adm');
});
module.exports=router;