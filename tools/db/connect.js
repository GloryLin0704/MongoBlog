var mongoose = require('mongoose');
var mongoUri = 'mongodb://127.0.0.1/Blog';

mongoose.connect(mongoUri);

module.exports = mongoose;