var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var secret = 'TheBlogSecret'; 

var { userModel } = require('../tools/db');

router.post('/register', function(req, res){
    var password = crypto.createHash('sha256', secret)
                    .update(req.body.password).digest('hex');
    
    var data = new userModel({
        username: req.body.username,
        password: password,
        email: req.body.email
    });

    data.save().then(suc => {
        res.json({
            code: 200,
            msg: '注册成功！'
        })
    }, err => {
        console.log('fail register');
    });
});

