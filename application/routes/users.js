var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const bcrypt = require('bcrypt');

/* localhost:3000/users/registration */
router.post('/registration', async function(req, res, next) {
  var {username,email,password} = req.body;

  try{
    //checking username uniqueness
    var [rows, fields] = await db.execute(`select id from users where username =?;`,[username]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }
    //checking email uniqueness
    var [rows, fields] = await db.execute(`select id from users where email =?;`,[email]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }

    var hashedPassword = await bcrypt.hash(password, 3);

    //inserting
    var [resultObject, fields] = await db.execute(`INSERT INTO users
    (username, email, password)
    value
    (?,?,?);`,[username,email,hashedPassword]);
    //responding
    if(resultObject && resultObject.affectedRows == 1){
      return res.redirect("/login");
    }else{
      return res.redirect("/registration");
    }
  }catch(error){
    next(error);
  }

});
router.post("/login", async function (req, res, next) {
  const { username, password} = req.body;
  if (!username || !password) {
    return res.redirect("/login");
  }else{
    var [rows, fields] = await db.execute(
      `select id,username,password,email from users where username=?;`,
      [username]
    );
    var user = rows[0];
    if(!user){
      req.flash("error",`Log In Failed: Invalid username/password`);
      req.session.save(function(err){
        return res.redirect("/login");
      })
    }else{
      var passwordsMatch = await bcrypt.compare(password, user.password);
      if(passwordsMatch){
        req.session.user = {
          userId: user.id,
          email: user.email,
          username: user.username
        };
        req.flash("success",`you logged in`);
        req.session.save(function(err){
          return res.redirect("/");
        })
      }else{
        return res.redirect("/login");
      }
    }
  }
});

router.use(function(req,res,next){
  if(req.session.user){
    next();
  }else{
    return res.redirect("/login");
  }
})

router.get('/profile/:id(\\d+)', function(req,res){
  res.render('profile');
});


router.post("/logout",function(req,res,next){
  req.session.destroy(function(err){
    if(err){
      next(err);
    }
    return res.redirect("/");
  })
});

module.exports = router;
