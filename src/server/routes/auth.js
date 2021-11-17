const { Router } = require("express");
const router = Router();

const bcrypt = require('bcrypt');
const saltRound = 10;

const passport = require("passport");
const db = require('./database')

router.post("/auth", 
passport.authenticate("local"),
async (req, res) => {
    console.log(req.user)
    res.sendStatus(200);
});

router.post('/setPassword', async (req, res) => {
    let username = req.body['username'];
    let id_person = req.body['id_code'];
    let new_password = req.body['new_password'];
    if(new_password == 'test') res.sendStatus(500);
    let conn;
    try {
        conn = await db.pool.getConnection();
        bcrypt.genSalt(saltRound, (err, salt) => {
            bcrypt.hash(new_password, salt, (err, hash) => {
                conn.query(`UPDATE User SET passcode='${hash}' WHERE userName='${username}' AND passcode='test' AND id_pers='${id_person}'`);
            });
        });
        conn.end();
       
        res.sendStatus(200);
    } catch (err) {
        throw err;
    }
});

module.exports = router;