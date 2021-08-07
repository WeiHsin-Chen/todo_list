module.exports = {
  authenticator: (req, res, next) => {
    console.log(req.isAuthenticated())
    // 學期三 U25解釋
    if (req.isAuthenticated()) {
      console.log('success')
      return next()
    }
    console.log('failure')
    res.redirect('/users/login')
  }
}