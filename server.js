const express = require('express')
const session = require('express-session')
const path = require('path')
const indexRoute = require('./routes/mainPage')
const loginRoute = require('./routes/login')
const adminRoute = require('./routes/admin')
const logoutRoute = require('./routes/logout')
const registerRoute = require('./routes/register')
const cartRoute = require('./routes/cart')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const passportInit = require('./passport-cfg')
const mongoInit = require('./mongoConnection')
const app = express()
const PORT = 3000 || process.env.PORT

mongoInit()

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname + '/client/')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// passport middleware
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

app.use(passport.initialize())
app.use(passport.session())
passportInit(passport)

app.use('/', indexRoute)
app.use('/login', loginRoute)
app.use('/admin', adminRoute)
app.use('/register', registerRoute)
app.use('/cart', cartRoute)
app.use('/logout', logoutRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

})