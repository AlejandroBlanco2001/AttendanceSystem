const { Router } = require("express");
const router = Router();

const util = require('../../utils');
const db = require('./database');
const moment = require('moment');

const io = require('../controllers/socket').getio();

router.get('/subject/:id', async (req,res) => {
    let id = req.params.id;
    let conn = await db.pool.getConnection();
    let result = await util.getSubjectInfo(conn,id);
    if(result == -1) res.sendStatus(500)
    else res.json(result);
});

router.get('/getAttendance', async (req,res) => {
    let {code} = req.body;
    let conn = await db.pool.getConnection();
    let result = await util.getAttendanceClass(conn,code);
    if(result == -1) res.sendStatus(500);
    else res.json(result);
})

router.post('/takeAttendance', async (req,res) => {
    let {id_class, id_teacher} = req.body;
    id_class = id_class.split('\/')[1];
    let conn = await db.pool.getConnection();
    let result = await util.getHourClass(conn,id_class);
    let resClass = await util.checkCodesClass(conn,id_class);
    let resTeach = await util.checkCodesTeacher(conn,id_teacher);
    conn.end();
    let hour = new Date().toLocaleString().split(',')[0] + ' ' + result[0].time
    let curr = new Date();
    let limit_assist = moment(curr).add(10,'m').toDate();
    let limit_late = moment(curr).add(20,'m').toDate();
    console.log(limit_late + ' ' + limit_assist)
    console.log(curr >= hour)
    if(resClass != -1 && resTeach != -1){
        if(curr >= hour){
            let conn = await db.pool.getConnection();
            let clas = await util.getClassSession(conn,id_class)[0].code;
            if(curr <= limit_assist){
                await conn.query('INSERT INTO clas_stud VALUES(?,?,?)',[clas,req.user.id_pers," "])
                asiss = ' ';
            }else if(curr <= limit_late){
                await conn.query('INSERT INTO clas_stud VALUES(?,?,?)',[clas,req.user.id_pers,"-"])
                asiss = '-';
            }else{
                await conn.query('INSERT INTO clas_stud VALUES(?,?,?)',[clas,req.user.id_pers,"+"])
                asiss = '+';
            }
            conn.end();
            res.sendStatus(200);
        }
        res.send('To early');
    }
})

module.exports = router;
