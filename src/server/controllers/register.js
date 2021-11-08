const bycrypt = require('bcrypt')
const saltRounds = 10;

module.exports.set = (app) => {
    app.post('/setPassword', (req,res) => {
        let password = 'test';
        bycrypt.genSalt(saltRound, (err,salt) => {
            bycrypt.hash(password, salt, (err,hash) => {
                // store the password on the database
            })
        })
    })
}