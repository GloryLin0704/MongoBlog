var jwt = require('jsonwebtoken'),
    SECRET = 'TheJwtSecret';

var auth = {};

auth.get = function(data = {}){
    return jwt.sign({
        // 一个钟
        exp: Math.floor(Date.now()/1000) + 99000000,
        data: data
    }, SECRET);
};

auth.check = function(token){
    var data;

    try{
        data = jwt.verify(token, SECRET);
    } catch(err) {
        return false;
    };

    return data;
}

module.exports = auth;