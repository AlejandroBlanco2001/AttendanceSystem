const bcrypt = require('bcrypt');

const localStrategy = require('passport-local');
const passport = require('passport');
const db = require('../routes/database');
const saltRound = 10;

passport.serializeUser((user,done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username,done) => {
    try{
        conn = await db.pool.getConnection();
        const res = await conn.query(`SELECT user_password FROM Usuarios WHERE username="${username}"`);
        if(res[0]['passcode']){
            done(null, res[0]['passcode']);
        }
    }catch(err){
        done(err,null);
    }
})

passport.use(new localStrategy({
    passReqToCallback: true,
    },async (req,username,password, done) => {
        var conn;
        try{
            conn = await db.pool.getConnection();
            const res = await conn.query(`SELECT * FROM users WHERE correo="${username}"`);
            if(res.length === 0){
                done(null,false,{status:'-1', motive:'Not existing user'});
            }else{
                let passwordDB = res[0]['passcode'];
                // if(passwordDB === 'test' && password === 'test') done(null,false,{status: '2', motive:'New login'})
                //else{
                    if(passwordDB == password) done(null,res[0])
                    /*
                    bcrypt.genSalt(saltRound, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            password = hash; 
                        });
                    });
                    bcrypt.compare(password, passwordDB, (err, result) => {
                        if(result) done(null, res[0], {status:'0', motive:'Succesfull login'})
                        else done(null,false, {status:'1', motive:'Password dont match'})
                    });
                    */
                //}
            }
        }catch(err){
            done(err,false);
        }
    }
))