// Frameworks/libs
const express = require('express')
const passport = require('passport')
// Methods
const router = express.Router()


// GET: localhost:3000/login
router.get('/', (req, res) => {
    res.render('login', { message: req.flash('error')})
});

// POST: localhost:3000/login
router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, flash) => { // Authenticating user with passport local strategy using custom handler
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', flash.err)
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.session.passport.user = user.id
            res.redirect('/')
      });
    })(req, res, next);
  });

module.exports = router;