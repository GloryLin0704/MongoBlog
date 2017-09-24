var mongoose = require('./connect');

var scheams = {};

scheams.user = mongoose.Schema({
    username: {
        type: String,
        required: true
    } ,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});


scheams.blog = mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    }
});


scheams.comment = mongoose.Schema({
    commentator: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    id: { 
        type: String,
        required: true
    }
});

module.exports = scheams;