const { Router } = require("express");
const router = Router();

const util = require('../../utils');
const db = require('./database');

router.get('/subject/:id', async (req,res) => {
    let id = req.params.id;
    let conn = await db.pool.getConnection();
    let result = await util.getSubjectInfo(conn,id);
    console.log(result)
    if(result == -1) res.sendStatus(500)
    else res.json(result);
});

router.get('/join_class/:id', (req, res) => {
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

module.exports = router;
