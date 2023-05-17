var db = require('../conf/database');
module.exports = {
    usernameCheck: function(req,res,next){
        let startWithChar = /[a-zA-Z]/;
        var {username} = req.body;
        username = username.trim();
        if(!(username.length >= 3)){
            req.flash("error","username must be 3 or more characters");
        }
        if(!startWithChar.test(username.charAt(0))){

            req.flash("error","username must start with a character");
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    passwordCheck: function(req,res,next){
        var {password} = req.body;
        let upperCase = /[A-Z]/;
        let specialChar = /[/*-+!@#$^&*]/;
        let number = /[0-9]/;
        if(!password.length >= 8){
            req.flash("error","password must be 8 or more characters");
        }
        if(!upperCase.test(password)){
            req.flash("error","password must start with an uppercase letter");
        }
        if(!specialChar.test(password)){
            req.flash("error","password must contain a special character");
        }
        if(!number.test(password)){
            req.flash("error","password must contain a number");
        }if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    emailCheck: function(req,res,next){
        var {email} = req.body;
        let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!validEmail.test(email)){
            req.flash("error","invalid email!")
        }if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    tosCheck: function(req,res,next){
        var {TOS} = req.body;
        if(!(TOS === 'on')){
            req.flash("error","Must check the Tos Box");
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    ageCheck: function(req,res,next){
        var {age} = req.body;
        if(!(age === 'on')){
            req.flash("error","Must be at least 13 years old");
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    isUsernameUnique: async function(req,res,next){
        var {username} = req.body;
        try{
            var [rows, fields] = await db.execute(`select id from users where username =?;`,[username]);
            if(rows && rows.length > 0){
                req.flash("error",`${username} is already taken`);
                return req.session.save(function(err){
                    return res.redirect('/registration');
                });
            }else{
                next();
            }
        }catch(error){
            next(error);
        }
    },
    isEmailUnique: async function (req,res,next){
        var {email} = req.body;
        try{
            var [rows, fields] = await db.execute(`select id from users where email =?;`,[email]);
            if(rows && rows.length > 0){
                return req.session.save(function(err){
                    return res.redirect('/registration');
                });
            }else{
                next();
            }
        }catch(error){
            next(error);
        }
    }
}