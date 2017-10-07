const express = require('express')
    , router = express.Router()
    , auth = require('../tools/auth');

router.all('*', function(req, res, next){
    var token = req.headers.authorization;
    var auth = auth.check(token);
    console.log('token');
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


module.exports = router;