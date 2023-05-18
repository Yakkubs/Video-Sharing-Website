var express = require('express');
var router = express.Router();
var {isLoggedIn} = require('../middleware/auth')
var db = require('../conf/database');

router.post('/create', isLoggedIn ,async function(req,res,next){
    var {userId} = req.session.user;
    var {postId, comment} = req.body;


    try{
        db.execute(
            `INSERT INTO comments (text,fk_postID,fk_authorID) VALUE (?,?,?)`,
            [comment,postId,userId]
        );
        if(insert && insertResult.affectedRows == 1){
            return res.status(201).json({
                commentId: insertResult.insertId,
                username: username,
                commentText: comment,
            });
        }else{
            
        }
    }catch(error){
        next(error);
    }
    
});


module.exports = router;