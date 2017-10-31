const express = require('express')
    , router = express.Router()
    , users = require('./users')
    , register = require('./register')
    , login  = require('./login')
    , filter = require('./filter')
    , auth = require('../tools/auth')
    , commnet = require('./comment');
    
    // , essay = require('./essay')

router.get('/', function(req, res, next){
    res.json({
        code: 200,
        data: Welcome    
    });
});

//注册
router.use('/register', register);

//登陆
router.use('/login', login);

//过滤
router.all('*', function(req, res, next){
    var token = req.headers.authorization;
    auth_info = auth.check(token);
    if(auth_info){
        console.log('用户：',auth_info.data.username);
        req.username = auth_info.data.username;
        next();
    } else {
        res.json({
            code: 400,
            msg: 'token 无效或过期 请重新登陆'
        });
    };
});


//用户
router.use('/users', users);

//文章
// router.use('/essay', essay);

//评论
 router.use('/comment', comment);

module.exports = router;