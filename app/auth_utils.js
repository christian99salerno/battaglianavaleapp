const utils = {

  checkPassword: function (req, res, next) {
    const passwd1 = req.body.password;
    const passwd2 = req.body.password2;

    if (passwd1 === passwd2) {
      return next();
    }

    req.flash('signupMessage', "Passwords don't match")
    res.redirect('/');
  },

  checkEmail: function (req, res, next) {
    // controllare se e' veramente un email
    // req.body.email
     return next();
  },

  notLoggedIn: function (req, res, next) {
    if (!req.isAuthenticated()) return next();

    res.redirect('/home');
  },

  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/');
  },

  isAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role==='admin') return next();

    res.redirect('/');
  },

  role: function (req) {
    if (!req.isAuthenticated()) return "guest";

    return req.user.role;
  },

};

module.exports = utils;
