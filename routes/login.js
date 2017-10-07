var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var auth = require('../tools/auth');
var secret = 'TheBlogSecret'; 

var { userModel } = require('../tools/db');

router.get('/', (req, res) => {
    res.json({
        code: 200,
        data: 'Welcome'    
    });
})

router.post('/', function(req, res, next){
    var username = req.body.username;
    var password = crypto.createHash('sha256', secret)
                    .update(req.body.password).digest('hex');

    userModel.findOne({
        username: username
    }).then(user => {
        if (user && password === user.password){
            var token = auth.get({
                username: username
            });
            // res.setHeader('authorization', token);
            res.json({
                code: 200,
                data: token,
                msg: '登陆成功'
            }); 
        } else {
            res.json({
                code: 400,
                msg: '用户名或密码错误！'    
            });
        };
    });
});


module.exports = router; 
