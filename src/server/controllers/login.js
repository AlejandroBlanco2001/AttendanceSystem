const bcrypt = require('bcrypt');
const passport=  require('passport');

module.exports.set = (app) => { 

    app.get('/login',(req,res) =>{
        // Login res.send()
    });

    // Login
    app.post('/auth',
    passport.authenticate('local'),
    (req,res) =>{
        let username = 'isaac';
        let password = '123';
        if(username && password){
            let passwordDB = '123';// QUERY FOR PASSWORD GIVEN THE USER;
            bcrypt.compare(pasword, passwordDB, (err,result) => {
                req.session.loggedin = true;
                req.session.username = username;
            })
        }else{
            res.send('Please enter Username and password!');
            res.end();
        }
    })
}