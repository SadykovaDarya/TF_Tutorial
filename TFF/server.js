const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const sql = require("mssql");

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);


const connection = {
    user: 'test',
    password: 'qwerty123', 
    server: 'DESKTOP-22J8Q8G',
    database: 'TFApplication'
};

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));


app.listen(4000, () => {
    console.log("I am listening on port 4000");
});


app.get('/server', (req, res) => {
    sql.connect(connection, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Tasks', function (err, recordset) {

            if (err) console.log(err);

            // send records as a response
            res.send(recordset);
            sql.close();
        });
    });
});
