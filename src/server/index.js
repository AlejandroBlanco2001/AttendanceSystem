require('dotenv').config({path: 'variables.env'});

const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');

var controllers = require('./controllers');

const port = process.env.PORT || 80; 

app.use(session({
    secret: process.env.COOKIE_KEY,
    resave: true,
    saveUninitialized: true
}));

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () =>{
    console.log(`Back-End is listening in http://localhost:${port}`)
});

controllers.set(app);
