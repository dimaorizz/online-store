const User = require('../models/User') // user model

// function purpose: check if user is Admin
const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.session.user_id)
    if(user.isAdmin){
        return next()
    } else {
        res.status(401).send()
        return res.redirect('/login')
    }
}

module.exports = isAdmin