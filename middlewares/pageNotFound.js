// function purpose: render notFoundPage
const notFound = (req, res, next) => {
    res.render('404', { url: req.protocol + '://' + req.get('host') + req.originalUrl })
}

module.exports = notFound