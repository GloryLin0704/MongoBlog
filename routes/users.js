var express = require('express');
var router = express.Router();
var insertData = require('../tools/db').insertData;
var insertUser = require('../tools/db').insertUser;
var selectUser = require('../tools/db').selectUser;
var deleteData =  require('../tools/db').deleteData;
var updateData = require('../tools/db').updateData;
var auth = require('../tools/cookie');
var crypto = require('crypto');
var secret = 'abcdefg';
var jwt = require('jsonwebtoken');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/Mongo'; 

router.get('/', function(req, res) {
  res.send('Hello World');
});

router.get('/register',function(req,res){
  res.render('register');
});

router.post('/register',function(req,res){
  var userName = req.body.username;
  var passWord = req.body.password;

  var hash = crypto.createHash('sha256', secret)
            .update(passWord).digest('hex');

  var data = [{"username":userName, "password":hash}];

  MongoClient.connect(DB_CONN_STR, function(err, db) {
    insertUser(db, data,  function(result) {
        console.log(result);
        db.close();
     });
  }) 
  res.render('suc');
});


router.get('/new', function(req, res, next) {
	if((auth.authorizations.some(e => e.username === req.cookies.username)) && (auth.authorizations.some(e => e.auth === req.cookies.auth))){
		res.render('new');
	} else {
		res.render("login");
	}
});


router.get('/login',function(req, res, next) {
  res.render('login');
});


router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var hash = crypto.createHash('sha256', secret)
          .update(password).digest('hex');


  if(username === "" || password === ""){
    res.render('loginFail');
    return;
    }

	MongoClient.connect(DB_CONN_STR, function(err, db) {
		selectUser(db, username, function(result){
      if (Object.keys(result).length === 0){
        res.send('用户不存在');
        return;
      } else if (hash === result[0].password){
          auth.cookies(req, res, username);
          res.render('new');
      } 
			db.close();
		});
	});
});


router.post('/new', function(req, res, next) {
  var blog = req.body.blog;
  var tit = req.body.tit;
  var author = req.cookies.username;
  var myDate = new Date().toLocaleString();

   function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    var myID = "static" + guid();


  if (typeof blog === 'undefined' ||typeof tit === 'undefined'){
    res.render('fail');
  } else if ( blog === "" || tit === "") {
    res.render('fail');
  } else{

  data = [{ "content": blog,"title":tit,"id":myID, "time":myDate, "author":author}];
  
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    insertData(db, data,  function(result) {
        db.close();                                                                                                                                             
     });
  })

  res.render('suc');
}}
);


router.get('/delete',function(req, res, next){
  var id = req.query.id;

	MongoClient.connect(DB_CONN_STR, function(err, db) {
		deleteData(db, id, function(result) {
			res.render('suc');
			db.close(); 
		});
	});
})

router.get('/updata', function(req, res, next){
  var oldContent = req.query.content;
  var id = req.query.id;
  console.log(id);
  console.log(oldContent);

  res.render('updata', {
    content:oldContent,
    id:id
  })
})


router.post('/updata', function(req, res, next){
  var newContent = req.body.content;
  var id = req.query.id;
  var myDate = new Date().toLocaleString();

  MongoClient.connect(DB_CONN_STR, function(err, db) {
    updateData(db,id, newContent, myDate, function(result) {
      res.render('suc');
      db.close(); 
    });
  });
})

module.exports = router;

