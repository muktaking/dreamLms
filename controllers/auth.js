const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//controllers to handle the get request for login
module.exports.getLogin = (req,res,next)=>{
    let msg = req.flash('error');
    if (msg.length > 0){ 
        msg = msg[0];
    } else  {msg= null}
    res.status(200).render('./auth/login',{
        errorMessage: msg
    });
}

