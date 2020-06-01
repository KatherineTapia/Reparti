const express = require('express');
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});

const app = express();

const dbreparti = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const PublicDirectory = path.join(__dirname, './public');
app.use(express.static(PublicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: false
}));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');

dbreparti.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
});

//Define rutas
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5001, () => {
    console.log("Server started on Port 5001")
});