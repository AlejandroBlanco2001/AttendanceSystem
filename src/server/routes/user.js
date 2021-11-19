const qr = require('qrcode');

const {Router} = require('express');
const router = Router();
const path = require('path');


const db = require('./database');
const util = require('../../utils');

// Request the user profile information
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
        let type = req.user.type;
        let id = req.user.id_pers;
        if(type != '0'){
            let conn = await db.pool.getConnection();
            let result = type == '2' ? await util.getAllSubjetctsStudent(conn,id) : await util.getAllSubjetctsTeacher(conn,id);
            conn.end();
            result = type == '2' ? util.separateSameClass(result) : result;
            res.json(result);
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

router.get('/createQR', async (req,res) => {
    if(req.user['type'] == 1){
        let conn = await db.pool.getConnection();
        let teacherID = req.user['id_pers'];
        let teacherClass = await conn.query(`SELECT C.code FROM course C INNER JOIN person P ON C.id_teach = P.id WHERE P.id = '${teacherID}'`)[0];
        let code = teacherID + '/' + teacherClass;
        qr.toFile('./teacher_code.png', code,{
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
        io.emit('classReady','Code activaded', {
            class: teacherClass,
            start: new Date().toLocaleString,
            end: new Date().setMinutes(new Date().getMinutes() + 20)
        })
    }
})

module.exports = router;