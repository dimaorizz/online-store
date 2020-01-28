const User = require('../models/User')

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.session.user_id)
    console.log(user)
    if(user.isAdmin){
        return next()
    } else {
        return res.redirect('/login')
    }
}

module.exports = isAdmin