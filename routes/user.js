const express = require('express');
const {check,body} = require('express-validator/check');

const router = express.Router();
//importing controllers
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
//importing models
const User = require('../models/user'); 

//routing signUp
router.get('/signup',userController.signUpPage);
router.post('/signup',[
    body('username',"Invalid username. Username should be atleast 5 alpha-neumaric characters")
        .isAlphanumeric()
        .isLength({min: 5}),
    body('email')
        .isEmail()
        .withMessage('Invalid Email')
        .normalizeEmail()
        .custom((value,{req})=>{
            return User.find({email: value})
                .then(userDoc=>{
                    if(userDoc){
                        return Promise.reject('The Email is already exists');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        }),
    body('password','Please enter valid password. Password should be atleast 5 alpha-neumaric characters')
        .isLength({min: 5})
        .isAlphanumeric()
        .trim(),
    body('confirmPassword')
        .custom((value,{req})=>{
            if(value !== req.body.password){
                throw new Error('Password confirmation does not match password')
            }
            return true;
        })    
],userController.saveNewUser);

//routing login 
router.get('/login',authController.getLogin)

module.exports = router;