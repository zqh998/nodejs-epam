
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('/', require('./routers/index'));

const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log("Server running at port:", port);
})