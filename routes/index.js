var express = require('express');
var router = express.Router();
var selectData = require('../tools/db').selectData;
var selectDataContent = require('../tools/db').selectDataContent;

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/Mongo'; 

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  var page = req.body.page;

  if(page === undefined){
      page = 1;
  }
    console.log(page);
    page = page - 1 ;

  MongoClient.connect(DB_CONN_STR, function(err, db) {
    // console.log("连接成功！");
    selectData(db, page, function(result) {
      // console.log(result);
      res.render('index',{
        blogs: result
      });
      db.close();
    });
  });
});

router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  var page = req.body.page;

  if(page === undefined){
      page = 1;
  }else if(page === ""){
      page = 1;
  }else if(isNaN(page)){
      page = 1;
  }

  console.log(page);
  page = page - 1 ;

  MongoClient.connect(DB_CONN_STR, function(err, db) {
    // console.log("连接成功！");
    selectData(db, page, function(result) {
      // console.log(result);
      res.render('index',{
        blogs: result
      });
      db.close();
    });
  });
});


router.get('/detail',function(req, res, nex){
  id = req.query.blog_id;
  console.log(id);

  MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！selectDataContent");
    selectDataContent(db, id, function(result) {
      console.log(result);
      res.render('detail',{
        blog: result[0]
      });
      db.close();
    });
  });
})

module.exports = router;
