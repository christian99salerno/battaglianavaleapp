const express = require('express');
const User = require('./models/user.js');

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
    res.render('userprofile', {
      nomeUtente: req.user.local.firstname,
      cognomeUtente: req.user.local.lastname,
    });
  });

  router.post('/changeprofile', authUtils.isLoggedIn, function (req, res) {
    console.log(req.body);
    User.update({
      _id: req.user._id
    }, {
      $set: {
        'local.firstname': req.body.nome,
        'local.lastname': req.body.cognome
      }
    }).exec( function (err, result) {
      console.log(err);
      console.log(result);
      res.redirect('/userprofile');
    });
  });

  return router;
};

 
