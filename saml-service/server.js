const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', require('./server/index'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
