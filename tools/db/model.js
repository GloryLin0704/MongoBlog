var schemas = require('./schemas');
var mongoose = require('./connect');

var schemasNames = Object.keys(schemas);

var models = schemasNames.reduce((acc, name) => {
    acc[name + 'Mdole'] = mongoose.model(
        name,
        schemas[name]
    );
    return acc;
}, {});

module.exports = models;