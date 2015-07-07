var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/Posts');
require('../models/Comments');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all posts */
router.get('/posts', function(req, res, next){
	Post.find(function(err, posts){
		if(err){ return next(err); }

		res.json(posts);
	});
});

/* POST new post */
router.post('/posts', function(req, res, next){
	var post = new Post(req.body);

	post.save(function(err, post){
		if(err){ return next(err); }

		res.json(post);
	});
});

/* Set post parameter by ID */
router.param('post', function(req, res, next, id){
	var query = Post.findById(id);
	query.exec(function(err, post){
		if(err) { return next(err); }
		if(!post) { return next(new Error('can\'t find post')); }

		req.post = post;
		return next();
	});
});

/* GET a single post by ID */
router.get('/posts/:post', function(req, res){
	req.post.populate('comments', function(err, post){
		if(err) { return next(err); }

		res.json(post);
	})
});

/* PUT upvote for post by id */
router.put('/posts/:post/upvote', function(req, res, next) {
	req.post.upvote(function(err, post){
		if(err) { return next(err); }

		res.json(post);
	});
});

/* POST comment to post */
router.post('/posts/:post/comments', function(req, res, next) {
	var comment = new Comment(req.body);

	comment.save(function(err, comment){
		if(err){ return next(err); }

		req.post.comments.push(comment);
		req.post.save(function(err, post){
			if(err){ return next(err); }

			res.json(comment);
		});
	});
});

/* Set comment parameter by ID */
router.param('comment', function(req, res, next, id){
	var query = Comment.findById(id);
	query.exec(function(err, comment){
		if(err) { return next(err); }
		if(!comment) { return next(new Error('can\'t find comment')); }

		req.comment = comment;
		return next();
	});
});

/* GET a single comment by ID */
router.get('/posts/:post/comments/:comment', function(req, res){
	res.json(req.comment);
});

/* PUT upvote for comment by id */
router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
	req.comment.upvote(function(err, comment){
		if(err) { return next(err); }

		res.json(comment);
	});
});

module.exports = router;
