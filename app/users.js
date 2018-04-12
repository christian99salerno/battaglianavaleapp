const express = require('express');

const router = express.Router();

const authUtils = require('./auth_utils');

module.exports = function () {

  router.get('/home', authUtils.isLoggedIn, function (req, res) {
    if (authUtils.role(req) === 'admin') {
      res.redirect('/admin');
      return;
    }

    res.render('home');
  });

router.get('/userprofile', authUtils.isLoggedIn, function (req, res) {
    res.render('userprofile');
  });

  return router;
};

 
