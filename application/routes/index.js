var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const { getRecentPosts } = require('../middleware/posts');
var router = express.Router();

/* GET home page. */
router.get('/', getRecentPosts ,function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Yakoub Alkabsh" });
});


router.get('/login', function(req,res){
  res.render('login');
});

router.get('/postvideo',isLoggedIn,function(req,res){
  res.render('postvideo');
});

router.get('/registration',function(req,res){
  res.render('registration',{js:["registration.js"]});
});



module.exports = router;
