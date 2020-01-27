const express = require('express')
const passport = require('passport')
const router = express.Router()


// GET: localhost:3000/login/
router.get('/', (req, res) => {
    res.render('login')
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/')
      });
    })(req, res, next);
  });

module.exports = router;