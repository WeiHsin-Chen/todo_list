module.exports = {
  authenticator: (req, res, next) => {
    // 學期三 U25解釋
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}