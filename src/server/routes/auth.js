const {Router} = require("express");
const router = Router();

const passport = require("passport");
const saltRound = 10;
const db = require('./database')

// Login
router.post("/auth", (req, res) => {
    passport.authenticate("local", (err, user, info) => {
    if(err){
        res.sendStatus(500);
    }
    if (user) {
        res.send("Logged in");
    } else {
        switch (info['status']) {
            case '-1':
                res.send(info['motive'])
                break;
            case '1':
                res.send(info['motive'])
                break;
            case '2':
                res.redirect('resetPassword');
                break;
            default:
                break;
        }
    }
    })(req,res);
});

router.get('/resetPassword', (req,res) => {
    res.send('Work');
});

router.get('/test',(req,res) => {
    if(req.user){
        console.log(req.user);
    }else{
        res.send('Not logged in');
    }
});

router.post("/setPassword", async (req, res) => {
    let password = "test";
    let conn;
    let result;
    try{
        conn = await db.pool.getConnection();
        bycrypt.genSalt(saltRound, (err, salt) => {
            bycrypt.hash(password, salt, (err, hash) => {
                result = conn.query(`UPDATE users SET passcode='${hash}' WHERE correo='${req.user.username}'`)
            });
        });
    }catch(err){
        throw err;
    }
});

module.exports = router