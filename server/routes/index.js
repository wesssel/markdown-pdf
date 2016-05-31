var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    htmlToPdf = require('html-to-pdf'),
    md = require('node-markdown').Markdown,
    fs = require('fs');

/* post by id */
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

/* get post by id */
router.get('/posts/:post', function(req, res, next) {
    res.json(req.post);
});

/* get all posts */
router.get('/posts/', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

/* create post */
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);
  post.intro = post.text.split('[intro]')[0];
  
  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

/* delete post by id */
router.delete('/posts/:post', function(req, res, next) {
    req.post.remove(function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});

/* update post by id */
router.put('/posts/:post', function(req, res, next) {
    req.post.title = req.body.title;
    req.post.text = req.body.text;

    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(post);
    });
});

router.post('/print', function(req, res, next) {
    var id = req.body._id;
    var content = md(req.body.text);
    
    var css = fs.readFileSync('./client/css/app.min.css');
    var html = '<html><head><style>' + css + '</style></head><body>' + content + '</body></html>';
    var htmlPath = './uploads/html/' + id + '.html';
    var pdfPath = './uploads/pdf/' + id + '.pdf';
    
    if(id && content){
        writeHTML()
    }
    
    function writeHTML() {
        fs.writeFile(htmlPath, html, function(err) {
            if(err) {
                console.log(err);
            } else {
                writePDF()
            }
        }); 
    }
    
    function writePDF() {
        htmlToPdf.convertHTMLFile(htmlPath, pdfPath,
            function (error, success) {
            if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
    }
})

module.exports = router;
