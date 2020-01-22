const express = require('express');
const User = require('../');
const router = express.Router();


// GET: localhost:3000/login/
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {

});

module.exports = router;