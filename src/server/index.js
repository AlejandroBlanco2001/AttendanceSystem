var controllers = require('./controllers')
const express = require('express')
const app = express();
const session = require('express-session');
const port = process.env.PORT || 80; 


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () =>{
    console.log(`Back-End is listening in http://localhost:${port}`)
});

controllers.set(app);
