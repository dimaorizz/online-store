const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userTest = {
    id: 1,
    email: 'test@test.test',
    password: '123',
}

passport.serializeUser((user, done) => {
    console.log(`serialize: `, user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(`deserialize: `, id);
    const user = userTest.id === id ? userTest : false;
    done(null, user);
})

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        if(email === userTest.email && password === userTest.password){
            return done(null, userTest);
        }
        else{
            return done(null, false);
        }
    })
)