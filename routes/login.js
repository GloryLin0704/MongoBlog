var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var auth = require('')
var secret = 'TheBlogSecret'; 

var { userModel } = require('../tools/db');

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
            res.setHeader('authorization', token);
            res.json({
                code: 200,
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

router.all('*', function(req, res, next){
    var token = req.headers.authorization;
    var auth = auth.check(token);

    if(auth){
        console.log('用户：',auth.data.username);
        req.username = auth.data.username;
        next();
    } else {
        res.json({
            code: 400,
            msg: 'token 无效或过期 请重新登陆'
        });
    };
});