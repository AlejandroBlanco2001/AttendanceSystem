require('dotenv').config({path: 'variables.env'});

const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const local = require('./strategies/local')

const usersRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin')
const classRoute = require('./routes/class')

const port = process.env.PORT || 80; 

app.use(session({
    secret: process.env.COOKIE_KEY,
    saveUninitialized: false,
    cookie: { sameSite: 'strict' },
}));

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () =>{
    console.log(`Back-End is listening in http://localhost:${port}`)
});

app.use('/users', usersRoute);
app.use('/login', authRoute);
app.use('/admin', adminRoute);
app.use('/class', classRoute)
