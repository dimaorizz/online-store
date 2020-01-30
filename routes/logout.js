const express = require('express')
const router = express.Router()

// GET: localhost:3000/logout
router.get('/', (req, res) => {
    req.logout()    // log out from the session
    return res.redirect('/')
})

module.exports = router