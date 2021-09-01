const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./server/index'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
