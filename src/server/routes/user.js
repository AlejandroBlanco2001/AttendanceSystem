const io = require('socket.io')();
const qr = require('qrcode');

const {Router} = require('express');
const router = Router();
const db = require('./database');

const path = require('path');


io.on('codeCreated', (arg) => {
    console.log('The teacher arrived to class')
})

router.get('/me', async (req,res) =>{
    if(req.user){
        let conn = await db.pool.getConnection();
        let result = await conn.query(`SELECT * FROM Person WHERE id=${req.user['id_pers']}`);
        conn.end();
        res.json(result[0]);
    }
})

// Watch the class list of that student
router.get('/classes', async (req,res) =>{
    if(req.user){
        if(req.user.type == '0'){
            let conn = await db.getConnection();
            let result = await conn.query(`SELECT S.* FROM person P NATURAL JOIN course C NATURAL JOIN subject S WHERE id='${req.user.id_pers}'`);
            conn.end();
            res.json(result[0]);
        }
    }
})

router.get('/checkList/:id',(req,res) =>{
    if(req.user){
        if(req.user.type == '1'){
            res.send("You are autorized")
        }
        res.send('You are not autorized')
    }
    res.send('You are not logged in')
    // Query for obtaining the assistance of that class;
    // Send to a view the result
})

router.get('/createQR', (req,res) => {
    //if(req.user['type'] == 1){
        //let teacherUsername = req.user['username'];
        qr.toFile('./teacher_code.png','123',{
            color: {
                dark: '#FFF',
                light: '#0000'
            }
        }
        ,function(err){
            if(err) throw err
            console.log('Code generated')
        })
        res.sendFile(path.resolve('teacher_code.png'));
        //io.emit('classReady','Code activaded')
    //}
})

module.exports = router;