var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Yakoub Alkabsh",js:["index.js"] });
});


router.get('/login', function(req,res){
  res.render('login');
});

router.get('/postvideo', function(req,res){
  if(req.session.user){
    res.render('postvideo');
    next();
  }else{
    return res.redirect("/login");
  }
  
});

router.get('/registration', function(req,res){
  res.render('registration',{js:["registration.js"]});
});

router.get('/viewpost/:id(\\d+)', function(req,res){
  res.render('viewpost');
});

module.exports = router;
