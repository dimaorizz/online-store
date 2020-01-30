// Connected frameworks/libs
const express = require('express')
const session = require('express-session')
const path = require('path')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
// Routes
const indexRoute = require('./routes/mainPage')
const loginRoute = require('./routes/login')
const adminRoute = require('./routes/admin')
const logoutRoute = require('./routes/logout')
const registerRoute = require('./routes/register')
const cartRoute = require('./routes/cart')

// Utils
const passportInit = require('./passport-cfg')
const mongoInit = require('./mongoConnection')

const app = express() // Creating an express app
const PORT = 3000 || process.env.PORT // default PORT settings

mongoInit()

app.set('view engine', 'hbs') // setting view engine to handlebars
app.use(express.static(path.join(__dirname + '/client/'))) // setting static files path
app.use(express.json()) // json parser
app.use(express.urlencoded({ extended: false })) // urlencoded parser

// passport-session middleware
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
// Setting up passport
app.use(passport.initialize())
app.use(passport.session())
passportInit(passport)

// Setting up middleware routes
app.use('/', indexRoute)
app.use('/login', loginRoute)
app.use('/admin', adminRoute)
app.use('/register', registerRoute)
app.use('/cart', cartRoute)
app.use('/logout', logoutRoute)

// Setting up server on PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

})