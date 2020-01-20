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

app.get('/', (req, res) => {
    res.send('Hello!');
})
app.get('/admin', (req, res) => {
    res.send('Hello admin');
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})