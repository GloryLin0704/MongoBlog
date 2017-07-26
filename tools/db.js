var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/Mongo'; 

var insertData = function(db, data, callback) {  
    //连接到表
    var collection = db.collection('DB');
    //插入数据
    collection.insert(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}


var insertUser = function(db, data, callback) {  
  //连接到表  
  var collection = db.collection('User');
  //插入数据
  collection.insert(data, function(err, result){
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}


var selectData = function(db, page, callback) {  
  //连接到表  
  var collection = db.collection('DB');
  //查询数据
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


var selectDataContent = function(db, id, callback) {  
  //连接到表  
  var collection = db.collection('DB');
  //查询数据
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
  //连接到表  
  var collection = db.collection('User');
  //查询数据
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
  //连接到表  
  var collection = db.collection('DB');
  //删除数据
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
  //连接到表  
  var collection = db.collection('DB');
  //删除数据
  
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
    selectDataContent:selectDataContent
    };
