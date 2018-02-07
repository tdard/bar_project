'use strict';
const Express = require("express");
const router = Express.Router();

//app server web entier ecoute sur un port
//router range les routes a des endroits 

const Passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

const USER = {
    USERNAME: "Jack",
    PASSWORD: "Ripper"
};

const DB = require('../db.js');

Passport.use(new BasicStrategy((username, password, done) => {
    DB.get("SELECT * FROM USERS WHERE USERNAME = ?", [username], (err, user) => {
        if (err)
            return done(err);
        if (!user)
            returndone(null, false);
        //theoriquement on calcule le hash du mot de passe et on compare les hash.
        //librairie de hash: bcrypt
        if (password === user.PASSWORD)
        {
            user.PASSWORD = undefined; //enlève l'accessibilité du mot de passe plus tard dans le code
            return done(null, user);
        }
        return done(null, false);
        
    });
}));


//-----------------------

router.get('/login', Passport.authenticate('basic', {session: false}), (req, res) => {
    res.end('Hello ' + req.user.USERNAME);
});

module.exports.router = router;