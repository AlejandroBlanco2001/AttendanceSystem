const { Router } = require("express");
const router = Router();

const bcrypt = require("bcrypt");
const passport = require("passport");
const saltRounds = 10;

// Login
router.post("/auth", passport.authenticate("local"), (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        let passwordDB = "123"; // QUERY FOR PASSWORD GIVEN THE USER;
        bcrypt.compare(password, passwordDB, (err, result) => {
            req.session.loggedin = true;
            req.session.username = username;
    });
    } else {
        res.send("Please enter Username and password!");
        res.end();
    }
});

router.post("/setPassword", (req, res) => {
    let password = "test";
    bycrypt.genSalt(saltRound, (err, salt) => {
        bycrypt.hash(password, salt, (err, hash) => {
      // store the password on the database
        });
    });
});

module.exports = router
