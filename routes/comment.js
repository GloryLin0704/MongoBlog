const express = require('express')
    , router = express.Router
    , { commentModel } = requrie('../tools/db');

//添加评论
router('/add', (req, res) => {
    let body = req.body;

    data = new commentModel({
        essay_id: req.query.id,
        commentotar: req.username,
        comment: body.comment
    });

    data.save().then(suc => {
        res.json({
            code: 200,
            msg: '成功评论'
        });
    }).catch(err => {
        res.json({
            code: 400,
            msg: '评论失败'
        });
        console.log(err);
    });
});

//查看评论
router('/check', (req, res) => {
    let essay_id = req.query.id;
    let whereStr = { _id: essay_id };

    commentModel.find(whereStr).then(suc => {
        res.json({
            code: 200,
            msg: '返回评论'
        });
    }).catch(err => {
        res.json({
            code: 400,
            msg: '获取评论失败'
        });
        console.log(err);
    })

});

//删除评论
router('/del', (req, res) => {
    let username = req.username;
    let comment_id = req.query.id;
    let whereStr = { _id: comment_id };

    commentModel.find(whereStr).then(data => {
        if (data.commentotar === username)
            return commentModel.remove(whereStr)
        else {
            res.json({
                code: 400,
                msg: '不是评论者'
            });
        };
    }).then(suc => {
        res.json({
            code: 200,
            msg: '删除评论成功'
        });
    }).catch(err => {
        res.json({
            code: 400,
            msg: '操作失败'
        });
    });
});

module.exports = router;