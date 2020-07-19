// Require
const express= require('express');
const { unlink } = require('fs-extra');
const path = require('path');
const Data = require('../models/data.model');
var router= express.Router();

router.get('/product',(req,res)=>{
    Data.find((err,docs)=>{
        if (!err) {
            res.render("product",{
                data:docs
            });
        } else {
             console.log('Error in Data: '+ err);    
        }
    });
});

router.post('/product/add', async (req,res)=>{
    var arrayImage=req.files;
    var imag1 = arrayImage[0]["filename"];
    var imag2 = arrayImage[1]["filename"];
    var imag3 = arrayImage[2]["filename"];
    var imag4 = arrayImage[3]["filename"];
    var imag5 = arrayImage[4]["filename"];
   
    const data = new Data();
    data.name = req.body.name;
    data.price = req.body.price;
    data.description = req.body.description;
    data.category = req.body.category;
    data.path = '/img/uploads/' + imag1;
    data.path1 = '/img/uploads/' + imag2;
    data.path2 = '/img/uploads/' + imag3;
    data.path3 = '/img/uploads/' + imag4;
    data.path4 = '/img/uploads/' + imag5;
    await data.save((err,doc)=>{
        if(!err){
            req.flash("success_msg", "Destino agregado satisfactoriamente");
            console.log('data: '+ data);
            res.redirect('/product');
            
        } else{
            console.log('Error : '+err);
        }
    });

});

/* router.get('/product/edit/:id',async (req,res)=>{
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
router.put('/product/data-edit/:id',async (req,res)=>{
    const {name, description, price, path} = req.body;
    await Data.findByIdAndUpdate(req.params.id, {name, description, price, path});
    res.redirect('/product');
}); */
router.get('/product/delete/:id',async (req,res)=>{
    const { id } = req.params;
    const imageDeleted = await Data.findByIdAndDelete(id);
    await unlink(path.resolve('./public' + imageDeleted.path));
    await unlink(path.resolve('./public' + imageDeleted.path1));
    await unlink(path.resolve('./public' + imageDeleted.path2));
    await unlink(path.resolve('./public' + imageDeleted.path3));
    await unlink(path.resolve('./public' + imageDeleted.path4));
    res.redirect('/product');
});
module.exports=router;