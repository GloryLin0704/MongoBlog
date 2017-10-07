var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/Mongo'; 

var insertData = function(db, data, callback) {  

  var collection = db.collection('DB');

  collection.insert(data, function(err, result) { 
    if(err)
    {
        console.log('Error:'+ err);
        return;
    }     
    callback(result);
  });
}


var insertComment = function(db, data, callback) {  

  var collection = db.collection('comment');

  collection.insert(data, function(err, result) { 
    if(err)
    {
        console.log('Error:'+ err);
        return;
    }     
    callback(result);
  });
}
//添加评论

var insertUser = function(db, data, callback) {  
  
  var collection = db.collection('User');
  
  collection.insert(data, function(err, result){
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}
//注册

var selectData = function(db, page, callback) {  
  
  var collection = db.collection('DB');
  var whereStr = {"title":{$gte:""}};
  
  collection.find(whereStr).limit(5).skip(page*5).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}
//

var selectComment = function(db, id, callback) {  
  
  var collection = db.collection('comment');
  var whereStr = {"id":id};

  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}
//选择评论

var selectDataContent = function(db, id, callback) {  
  
  var collection = db.collection('DB');
  var whereStr = {"id":id};
  
  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}


var selectUser = function(db, username, callback) {  
  
  var collection = db.collection('User');
  var whereStr = {"username":username};
  
  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}
 

var deleteData = function(db, id, callback) {  
  
  var collection = db.collection('DB');
  var whereStr = {"id":id };
  
  collection.remove(whereStr, function(err, result) {
    if(err)
    {
      console.log('出错')
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

var updateData = function(db, id, updata, date, callback) {  
  
  var collection = db.collection('DB');
  var whereStr = {"id":id };
  var updateStr = {$set: { "content" : updata, "time":date}};
  
  collection.update(whereStr, updateStr, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

module.exports = {
    insertData:insertData,
    insertUser:insertUser,
    selectUser:selectUser,
    selectData:selectData,
    deleteData:deleteData,
    updateData:updateData,
    selectComment:selectComment,
    insertComment:insertComment,
    selectDataContent:selectDataContent
    };
