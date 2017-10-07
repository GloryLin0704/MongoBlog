const express = require('express') 
    , router = express.Router()
    , { blogModel } = require('../tools/db')
    , { userModel} = require('../tools/db');

router.post('/new', function(req, res){
    var body = req.body;

    var data = new blogModel({
        title: body.title,
        content: body.content,
        author: req.username
    });
    console.log(req.username);

    data.save().then(suc => {
        res.json({
            code: 200,
            msg: '添加博客成功'
        });
    }).catch(err => {
        res.json({
            code: 400,
            msg: '添加博客失败'
        });
    });
});


router.get('/del', function(req, res){
    var username = req.username; 
    var _id = req.query._id; 

    userModel.findOne({
        username: username
    }).then(data => {
        if(username === data.username){
            return blogModel.remove({
                _id: _id
            })
        } else {
            return Promise.reject('要删除的用户不存在'); 
        }
    }).then(result => {
        res.json({
            code: 200,
            msg: '删除博客成功'
        });
    }, err => {
        console.log(err);
        res.json({
            code: 500, 
            err: err
        }); 
    });
});

module.exports = router; 
