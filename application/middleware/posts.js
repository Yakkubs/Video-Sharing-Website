var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var db = require('../conf/database');

module.exports = {
    makeThumbnail: function (req, res, next) {
        if (!req.file) {
            next(new Error("File upload failed"));
        } else {
            try {
                var destinationOfThumbnail = `public/images/uploads/thumbnail-${
                    req.file.filename.split(".")[0]
                }.png`;
                var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }
        }
    },
    getPostsForUserBy: function(req,res,next){
        var {id} = req.params;

        db.query('SELECT * FROM posts WHERE userId = ?', [userId], function (err, rows) {
            if (err) {
                next(err);
            } else {
                res.locals.posts = rows;
                next();
            }
        });
    },
    //middleware for viewpost
    getPostsById: function(req,res,next){
        res.locals.currentPosts = rows[0];
    },
    getCommentsForPostsById: function(req,res,next){
        res.locals.currentPosts.comments = rows;
    },
    getRecentPosts: function(req,res,next){

    },

}