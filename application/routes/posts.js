var express = require("express");
var router = express.Router();
var multer = require("multer");
var db = require('../conf/database');

const { makeThumbnail, getPostById, getCommentsForPostById } = require("../middleware/posts");
const { isLoggedIn } = require("../middleware/auth");
const { getPostsForUserBy } = require("../middleware/posts");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/videos/uploads");
    },
    filename: function (req, file, cb) {
        var fileExt = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    },
});

const upload = multer({ storage: storage });

router.post("/create", isLoggedIn, upload.single("video"), makeThumbnail, async function (req, res, next) {
    var { title, description } = req.body;
    var { path, thumbnail } = req.file;
    var { userId } = req.session.user;

    try {

        var [insertResult, _] = await db.execute(
            `INSERT INTO posts (title,description, video,thumbnail,fk_userID) VALUE (?,?,?,?,?);`,
            [title, description, path, thumbnail, userId]
        );
        if (insertResult && insertResult.affectedRows) {
            req.flash("success", "Your post was created!");
            return req.session.save(function (error) {
                if (error) next(error);
                return res.redirect(`/posts/${insertResult.insertId}`);
            })
        } else {
            next(new Error('Post could not be created'));
        }
    } catch (error) {
        next(error);
    }
});

router.get('/:id(\\d+)', getPostById, getCommentsForPostById,function (req, res,) {
    res.render("viewpost", {
        title: `view Post ${req.params.id}`,
    });
});

router.get("/search", async function(req,res,next){
    var {searchValue} = req.query;
    try{
        var [rows, _] = await db.execute(
            `select id,title,thumbnail, concat_ws(' ', title, description) as haystack
            from posts
            having haystack like ?;`,
            [`%${searchValue}%`]
        );

        if(rows && rows.length == 0){
            req.flash("error", `No post(s) found that fits that search desciption`);
            req.session.save(function(err){
                if(err) next(err);
                res.redirect('/');
            })
        }else{
            res.locals.posts = rows;
            return res.render('index');
        }
    }catch(error){
        next(error);
    }
});

router.delete("/delete", async function(req,res,next){
    var {id} = req.params;
    try{
    var [insertResult, _] = await db.execute(
        `Delete From posts where id = ?;`,
        [id]);
        res.render('index');
    }catch(error){
        next(error);
    }
});

module.exports = router;
