const db = require('./src/DB');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const sql = require("mssql");

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));


app.listen(4000, () => {
    console.log("I am listening on port 4000");
});



app.get('/getTasks', function (req, res, next) {
     //const topic = req.query.topic;

    var request = new sql.Request();

    //q = "select * from Tasks t join Answers a on t.ID = a.TaskID where TopicID=" + topic;
    q = "select * from Tasks t join Answers a on t.ID = a.TaskID";
    request.query(q, function (err, result) {
        if (err) {
            return res.send(err);
        }

        else {
            return res.send(result);
        }

    });
});



app.get('/getTopics', function (req, res, next) {
    var request = new sql.Request();
    request.query('select * from Topics', function (err, result) {
        if (err) {
            return res.send(err);
        }

        else {
            return res.send(result);
        }

    });
});


app.get('/getMaterials', function (req, res, next) {
    const topic = req.query.topic;
    var request = new sql.Request();
    q = "select * from Materials where TopicID=" + topic;
    request.query(q, function (err, result) {
        if (err) {
            return res.send(err);
        }

        else {
            return res.send(result);
        }

    });
});
