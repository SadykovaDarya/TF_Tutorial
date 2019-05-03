var mssql = require("mssql");
var dbConfig = {
    user: 'test',
    password: 'qwerty123',
    server: 'DESKTOP-22J8Q8G',
    database: 'TFApplication'
};


var connection = mssql.connect(dbConfig, function (err) {
    if (err)
        throw err;
});

module.exports = connection;
