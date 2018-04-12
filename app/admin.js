const express = require('express');
const User = require('./models/user.js');

const router = express.Router();

const authUtils = require('./auth_utils');

module.exports = function () {

  router.get('/admin', authUtils.isAdmin, function (req, res) {
    res.render('admin/home');
  });

  router.get('/gestisciutenti', authUtils.isAdmin, function (req, res) {
    User.find().sort({lastname: 1, firstname: 1, email: 1}).exec(function (err, result) {
      res.render('admin/users',{
        users:result
      });
    });
  });

  return router;
};
