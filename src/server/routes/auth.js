const { Router } = require("express");
const router = Router();

const passport = require("passport");
const saltRound = 10;

const db = require('./database')

router.post("/auth", 
passport.authenticate("local"),
(req, res) => {
    console.log(req.user);
    res.sendStatus(200);
});

router.get('/resetPassword', (req, res) => {
});

router.post("/setPassword", async (req, res) => {
    let password = "test";
    let conn;
    let result;
    try {
        conn = await db.pool.getConnection();
        bycrypt.genSalt(saltRound, (err, salt) => {
            bycrypt.hash(password, salt, (err, hash) => {
                result = conn.query(`UPDATE users SET passcode='${hash}' WHERE correo='${req.user.username}'`)
            });
        });
    } catch (err) {
        throw err;
    }
});

module.exports = router;