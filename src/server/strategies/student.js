const localStrategy = require('passport-local');
const passport = require('passport');
const db = require('../routes/database')

passport.serializeUser((user,done) => {
    done(null, user.role)
})

passport.deserializeUser(async (username,done) => {
    try{
        conn = await db.pool.getConnection();
        const res = await conn.query(`SELECT user_password FROM Usuarios WHERE username="${username}"`);
        if(res[0]['role']){
            done(null, res[0]['role']);
        }
    }catch(err){
        done(err,null);
    }
})

passport.use(new localStrategy(
    async (username, done) => {
        var conn;
        try{
            conn = await db.pool.getConnection();
            const res = await conn.query(`SELECT * FROM Usuarios WHERE username="${username}"`);
            if(res.length === 0){
                done(null,false);
            }else{
                let role = res[0]['user_password'];
                if(role == '2'){
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