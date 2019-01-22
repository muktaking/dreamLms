const  mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator/check'); // validating signup, login data

const User = require('../models/user'); 

const signUpPage = (req,res,next)=>{
    let msg = req.flash('error');
        if (msg.length > 0){
            //console.log(req.flash('error')) 
            msg = msg[0];
        } else  {msg= null}
    res.status(200).render('./auth/signup',{
        errorMessage: msg,
        oldInput: {email: "", password: "", re_password: ""},
        invalidErrors: []
    });
}


const saveNewUser = (req,res,next)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        console.log(errors.array());
        return res.status(422).render('./auth/signup',{
            errorMessage: errors.array()[0].msg,
            oldInput: {email, password, retypePassword: req.body.retypePassword},
            invalidErrors: errors.array()
        });
    }

    bcrypt.hash(password,12)
        .then(hash=>{
            const user = new User({username,email,password:hash,gender});
            return user.save();
        }).then(isSaved=>{
            res.redirect('/');
            console.log(isSaved);
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports ={
    saveNewUser,
    signUpPage 
}