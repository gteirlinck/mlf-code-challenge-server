const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    
    // Serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Used to deserialize the user
    passport.deserializeUser((user, done) => {
        done(null, user); // TODO : find user in DB
    });

    passport.use(new LocalStrategy((username, password, done) => {
        console.log('coucou');
        if (password !== 'password') {
            return done(null, false);
        } else {
            return done(null, username);
        }
    }));
}