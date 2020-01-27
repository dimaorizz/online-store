const isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    } else {
        return res.redirect('/login')
    }
}

module.exports = isAuth