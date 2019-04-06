const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.listen(4000, () => {
    console.log("I am listening on port 4000");
});

