const bcrypt = require('bcrypt');

const localStrategy = require('passport-local');
const passport = require('passport');
const db = require('../routes/database');
const saltRound = 10;

passport.serializeUser(async (user,done) => {
    done(null,user['username']);
})

passport.deserializeUser(async (username,done) => {
    try{
        conn = await db.pool.getConnection();
        const res = await conn.query(`SELECT * FROM User WHERE userName="${username}"`);
        const rol = await conn.query(`SELECT type FROM Person WHERE id="${res[0]['id_pers']}"`);
        let user = {...res[0],...rol[0]};
        conn.end();
        if(res[0]){
            done(null, user);
        }
    }catch(err){
        done(err,null)
    }
})

passport.use(new localStrategy(
    async (username, password, done) => {
    var conn;
    try {
        conn = await db.pool.getConnection();
        const res = await conn.query(`SELECT * FROM User WHERE userName="${username}"`);
        const rol = await conn.query(`SELECT type FROM Person WHERE id="${res[0]['id_pers']}"`);
        if (res.length === 0){
            done(null, false);
        }else {
            conn.end();
            let user = {...res[0],...rol[0]};
            let passwordDB = user['passcode'];
            if(passwordDB == 'test'){
                done(null,false)
            }
            bcrypt.genSalt(saltRound, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    password = hash;
                });
            });
            bcrypt.compare(password, passwordDB, (err, result) => {
                if (result) done(null, user)
                else done(null, false)
            });
        }
    } catch (err) {
        done(err, false);
    }
}));




