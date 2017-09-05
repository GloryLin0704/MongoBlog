var express = require('express');
var router = express.Router();
var selectData = require('../tools/db').selectData;
var selectDataContent = require('../tools/db').selectDataContent;
var insertComment = require('../tools/db').insertComment;
var selectComment = require('../tools/db').selectComment;

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/Mongo';

router.get('/api/list', function(req, res, next) {

	var page; 
	var author = req.cookies.username;

	if ("page" in req.query){
		page = parseInt(req.query.page); 
		if (Number.isNaN(page)){
			page = 0; 
		} else {
			page = page - 1; 
		}
	} else {
		page = 0;
	}

	MongoClient.connect(DB_CONN_STR, function(err, db) {
		selectData(db, page, function(result) {
			res.render('index',{
				blogs: result,
				username:author
			});
			db.close();
		});
	});
});


router.get('/api/detail',function(req, res, next){
	var id = req.query.id;
	var username = req.cookies.username;

	MongoClient.connect(DB_CONN_STR, function(err, db) {
		selectDataContent(db, id, function(result) {
			MongoClient.connect(DB_CONN_STR, function(err, db) {
				selectComment(db, id, function(comment) {
					res.render('detail',{
						blog: result[0],
						username:username,
						comments:comment
							});
					db.close();
				});
			})
			db.close();
		});
	});
})

router.post('/api/comment',function(req, res, next){

	var comment = req.body.comment;
	var username = req.query.username;
	var id = req.query.id;

	var data = [{"username":username, "comment":comment, "id":id}];

	MongoClient.connect(DB_CONN_STR, function(err, db) {
		insertComment(db, data, function(result) {
			db.close();
			res.render('suc');
		});
	});
})

module.exports = router;
