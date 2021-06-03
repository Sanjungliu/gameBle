const loginCheck = (req, res, next) => {
    if (req.session.loginStatus === true) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = loginCheck