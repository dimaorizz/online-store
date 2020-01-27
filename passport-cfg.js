const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const User = require('./models/User')

function init(passport) {
    const authUser = async (email, password, done) => {
        const user = await User.findOne({ email })
        if(user === null){
            return done(null, false, { message: 'No user with this email' })
        }

        try{
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Wrong password' })
            }
        } catch(err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authUser))
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = User.findById({ id })
        return done(null, user)
    })
}

module.exports = init;