const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const app = express();
const PORT = 3000 || process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'dadFDEF4gh',
    store: new FileStore(),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 60 minutes
    },
    resave: false,
    saveUninitialized: false,
}))

require('./passport-cfg');
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if(err) {
            return next(err);
        }
        if(!user){
            return res.send('wrong login/password');
        }
        req.logIn(user, err => {
            if(err){
                return next(err);
            }
        res.redirect('/admin');
        })
    })(req, res, next)
});

app.get('/', (req, res) => {
    res.send('Hello!');
})

const auth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/');
    }
}

app.get('/admin', auth, (req, res) => {
    res.send('Hello admin');
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})