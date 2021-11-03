const qr = require('qrcode');
const express = require('express')
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT || 80; 

// Sockets

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/',(req,res) =>{
    if(req.session.loggedin){
        response.send('Welcome back, ' + req.session.username + '!');
    }else{
        res.send('Server is working!');
    }
    res.end();
});

app.get('/login',(req,res) =>{
    // Login res.send()
});

// Schedule list
app.post('/schedule',(req,res) =>{

})

// Login
app.post('/auth',(req,res) =>{
    let username = 'isaac';
    let password = '123';
    if(username && password){
        // query para verificar existencia
        req.session.loggedin = true;
        req.session.username = username;
    }else{
        res.send('Please enter Username and password!');
        res.end();
    }
})

// attendace
app.post('/checkList',(req,res) =>{

})

// Classroom
app.get('/join_class/:id',(req,res) => {
    let class_id = req.params.id;
    // Query para verificar existencia de la clase
    // QR profesor
    // QR clase
    // QR profesor + Qr clase = Asistencia
    /*
    qr.toFile('./class.png',class_id,{
        color: {
            dark: '#FFF',
            light: '#0000'
        }
    }
    ,function(err){
        if(err) throw err
        console.log('Code generated')
    })
    */
});

app.listen(port, () =>{
    console.log(`Back-End is listening in http://localhost:${port}`)
});