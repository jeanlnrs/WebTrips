// Require
const express= require('express');
const mongoose= require('mongoose');
const User = require('../models/user.model');
const user = mongoose.model('User');

// Modules
const passport = require("passport");

//Config
var router= express.Router();

//GET
router.get('/users/signin',(req,res)=>{
    res.render('users/signin');
});

router.get('/users/signup',(req,res)=>{
    res.render('users/signup');
});

//POST
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: "/",
        failureRedirect: "/users/signin"
}));

router.post('/users/signup', async (req,res)=>{
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (password != confirm_password) {
        errors.push({ text: "Passwords no coinciden" });
      }
      /* if (password.length < 4) {
          console.log('Passwords must be at least 4 characters');
        //errors.push({ text: "Passwords must be at least 4 characters." });
      } */
      if (errors.length > 0) {
        res.render("users/signup", {
          errors,
          name,
          email,
          password,
          confirm_password
        });
        
      } else {
         
        // Look for email coincidence
        const emailUser = await user.findOne({ email: email });
        if (emailUser) {
          //req.flash("error_msg", "Este correo ya esta en uso");
          res.redirect("/users/signup");
        } else {
          // Saving a New User
          const newUser = new user({ name, email, password });
          newUser.password = await newUser.encryptPassword(password);
          await newUser.save();
          //req.flash("success_msg", "Te haz registrado con exito.");
          res.redirect("/users/signin"); }
        }
    }
);

module.exports=router;

