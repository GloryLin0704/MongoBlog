const express = require('express')
    , router = express.Router()
    , user = require('./user')
    , eassy = require('./eassy')
    , commnet = require('./comment');


router.get('/', function(req, res, next){
    res.json({
        code: 200,
        data: Welcome    
    })
})

//用户
router.use('/user', user);

//文章
router.use('/eassy', eassy);

//评论
router.use('/comment', comment);

