const LocalStrategy = require('passport-local').Strategy; // LocalStrategy (login/password)
const bcrypt = require('bcryptjs') // encrypt lib
const User = require('./models/User') // User model

// input: passport - require('passport')
// output: callback (done() returns user mongo object if user found, false if user is not found or password is incorrect, error if there is an error)
function init(passport) {
    const authUser = async (email, password, done) => {
        const user = await User.findOne({ email })
        if(user === null){
            return done(null, false, { err: 'No user with this email' })
        }

        try{
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { err: 'Wrong password' })
            }
        } catch(err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ /*options for changing default names in local strategy */ usernameField: 'email' }, authUser))
    
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = User.findById({ id })
        return done(null, user)
    })
}

module.exports = init;