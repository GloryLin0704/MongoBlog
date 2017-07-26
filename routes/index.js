var express = require('express');
var router = express.Router();
var selectData = require('../tools/db').selectData;
var selectDataContent = require('../tools/db').selectDataContent;

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
			// res.json({
			// 	code:200,
			// 	data:result,
			// 	msg:'成功'

			// });
			db.close();
		});
	});
});


router.get('/api/detail',function(req, res, next){
	var id = req.query.blog_id;
	var username = req.cookies.username;

	MongoClient.connect(DB_CONN_STR, function(err, db) {
		selectDataContent(db, id, function(result) {
			res.render('detail',{
				blog: result[0],
				username:username
			});
			// res.json({
			// 	code:200,
			// 	data:result[0],
			// 	msg:'成功'
			// })
			db.close();
		});
	});
})

router.get('/api/comment',function(req, res, next){

	var comment = req.body.comment;
	var username = req.query.username;

	MongoClient.connect(DB_CONN_STR, function(err, db) {
		insertData(db, comment, username,  function(result) {
			res.render('suc');
			// res.json({
			// 	code:200,
			// 	data:result[0],
			// 	msg:'成功'
			// })
			db.close();
		});
	});
})

module.exports = router;
