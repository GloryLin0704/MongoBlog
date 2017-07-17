var express = require('express');
var router = express.Router();
var insertData = require('../tools/db').insertData;
var auth = require('../tools/cookie');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/Mongo'; 

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/new',function(req, res, next) {
//   res.render('new');
//    {
//     hello: 'world'
//   }

// });

router.get('/new', function(req, res, next) {
	if((auth.authorizations.some(e => e.username === req.cookies.username)) && (auth.authorizations.some(e => e.auth === req.cookies.auth))){
		console.log(auth.authorizations);
		res.render('new');
	} else {
		res.render("login");
	}
});


router.get('/login',function(req, res, next) {
  res.render('login');
});

// function dataCheck(body){

// }

router.post('/*', function(req, res, next){
  if (dataCheck(req.body)){
    next(); 
  } else {
    res.render('error');
  }
})

router.post('/', function(req, res, next) {
  var username = req.body.username;
  console.log(username);
  if(username === ""){
    res.render('loginFail');
    }
  auth.cookies(req, res, username);
  res.render('new');
});


//Post提交上来的处理，添加Blog
router.post('/new', function(req, res, next) {
  var blog = req.body.blog;
  var tit = req.body.tit;
  var myDate = new Date().toLocaleString();
   function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    var myID = "static" + guid();


  if (typeof blog === 'undefined'){
    res.render('fail');
  } else if ( blog === "") {
    res.render('fail');
  } else{

  data = [{ "content": blog,"title":tit,"id":myID, "time":myDate}];
  
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    console.log(data);
    insertData(db, data,  function(result) {
        console.log(result);
        db.close();
     });
  })

  res.render('suc');
}}
);


module.exports = router;

