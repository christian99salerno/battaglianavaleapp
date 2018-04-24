const express = require('express');
const Match = require('./models/partita.js');
const authUtils = require('./auth_utils');

const router = express.Router();

module.exports = function () {
  router.post('/searchmatch', authUtils.isLoggedIn, function (req, res) {
    Match.findOne({state: "preparazione"}).exec(function (partita){
      console.log(partita); 
      if(!partita){
      const p = new Match({id_user1:req.user._id})
      p.save(function (err, partita) {
      res.render('incerca',{
      idPartita: partita._id });
      });
                  }
      else if(partita){


                      }
    });
  });

router.post('/annullamatch', authUtils.isLoggedIn, function (req, res) {
   console.log("idPartita da cancellare:", req.body.idPartita);
   Match.remove({idPartita:req.body.idPartita});
   res.render('home');
});

return router;
};

