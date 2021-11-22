const dotenv = require('dotenv');
const envConfig = dotenv.config({path: 'variables.env'});

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');

const passport = require('passport');
const engine = require('react-engine');

const db = require('./routes/database');
const local = require('./strategies/local');
const util = require('../utils');

const port = process.env.PORT || 80;

const serverInstance = app.listen(port, () =>{
    console.log(`Back-End is listening in http://localhost:${port}`)
});

const io = require('./controllers/socket').init(serverInstance);

const usersRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const classRoute = require('./routes/class');

app.engine('.jsx', engine.server.create());
app.set('views', path.join(__dirname,'src','client','pages'));
app.set('view engine', 'jsx')
app.set('view', engine.expressView);

var sessionMiddleware = session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: 'strict' },
});

app.use(sessionMiddleware);
app.use(cors(({credentials: true, origin: true})));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', usersRoute);
app.use('/login', authRoute);
app.use('/admin', adminRoute);
app.use('/class', classRoute);

app.get('/logout',(req, res) => { 
    req.logout();
    res.redirect('localhost:9000/');
});

io.on('connection', (socket) => {

    var checkInterval;
    socket.on('checkClassAlreadyStarted', async (data) => {
        checkInterval = setInterval(async () => {
            let conn = await db.pool.getConnection(); 
            let result = await util.getClassHours(conn,data.id_pers);
            if(result.length != 0){
                let code = await util.addTeacherCode(conn,result[0].codigo.split('\/')[1]);
                conn.end();
                socket.emit('classAlreadyStarted', {...result[0],codeTeacher: code})
            }
        },180000)
    })

    socket.on('classStarted', (data) => {
        socket.broadcast.emit('sendNotification',data)
    });

    socket.on('checkMyClass', async (data) => {
        let conn;
        try{
            conn = await db.pool.getConnection();
            let result = await util.getStudentsClass(conn,{code: data.code, id_pers: data.id_pers});
            conn.end();
            if(true){
                socket.emit('sendNotificationClass',result);
            }
        }catch(err){
            throw err;
        }
    });

    console.log("hello " + socket.id);
})
