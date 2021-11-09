const localStrategy = require('passport-local');
const passport = require('passport');
const db = require('../routes/database')

passport.serializeUser((user,done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username,done) => {
    try{
        conn = await db.pool.getConnection();
        const res = await conn.query(`SELECT user_password FROM Usuarios WHERE username="${username}"`);
        if(res[0]['user_password']){
            done(null, res[0]['user_password']);
        }
    }catch(err){
        done(err,null);
    }
})

passport.use(new localStrategy(
    async (username,password, done) => {
        var conn;
        try{
            conn = await db.pool.getConnection();
            const res = await conn.query(`SELECT * FROM Usuarios WHERE username="${username}"`);
            console.log(res.length)
            if(res.length === 0){
                done(null,false);
            }else{
                let passwordDB = res[0]['user_password'];
                console.log(passwordDB)
                if(passwordDB == password){
                    done(null, res[0])
                }else{
                    done(null, false)
                }
            }
        }catch(err){
            done(err,false);
        }
    }
))