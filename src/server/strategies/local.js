const bcrypt = require('bcrypt');

const localStrategy = require('passport-local');
const passport = require('passport');
const db = require('../routes/database');
const saltRound = 10;

passport.serializeUser(async (user,done) => {
    done(null,user['correo']);
})

passport.deserializeUser(async (email,done) => {
    try{
        conn = await db.pool.getConnection();
        const res = await conn.query(`SELECT * FROM users WHERE correo="${email}"`);
        if(res[0]){
            console.log(res[0])
            done(null, res[0]);
        }
    }catch(err){
        done(err,null)
    }
})

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    var conn;
    try {
        conn = await db.pool.getConnection();
        const res = await conn.query(`SELECT * FROM users WHERE correo="${email}"`);
        if (res.length === 0){
            done(null, false);
        }else {
            let passwordDB = res[0]['passcode'];
            if(password != passwordDB){
                done(null,false);
            }
            done(null,res[0]);
        }
    } catch (err) {
        done(err, false);
    }
}));

/*
            /*
            bcrypt.genSalt(saltRound, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    password = hash;
                });
            });
            bcrypt.compare(password, passwordDB, (err, result) => {
                if (result) done(null, res[0], {})
                else done(null, false, { status: '1', motive: 'Password dont match' })
            });
*/
