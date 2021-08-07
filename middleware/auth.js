module.exports = {
  authenticator: (req, res, next) => {
    // 學期三 U25解釋
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login')
  }
}