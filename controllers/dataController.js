// Require
const express= require('express');
const Data = require('../models/data.model');
var router= express.Router();

router.get('/adm', async (req,res)=>{
    const data = await Data.find();
    res.render('adm', {
        data
    });
});

router.post('/adm/add', async (req,res)=>{
    const data = new Data(req.body);
    await data.save();
    res.send('bien');
});

module.exports=router;