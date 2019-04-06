const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '111',
    database: 'TFApplication'
});

connection.connect(err => {
    if (err) {
        return err;
    }
});

var corsOptions = {
    origin: 'http://localhost:4000',
    methods: ['GET'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'contentType', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

//cors({ credentials: true, origin: true });
//app.use(cors());

const query = 'SELECT * FROM Tasks';


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.get('/server', (req, res) => {
    connection.query(query, (err, result) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            });
        }
    });
});


app.listen(4000, () => {
    console.log("I am listening on port 4000");
});
