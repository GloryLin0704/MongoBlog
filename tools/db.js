var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/Mongo'; 

var insertData = function(db, data, callback) {  

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
 
module.exports = {
    insertData:insertData,
    selectData:selectData,
    selectDataContent:selectDataContent
    };
