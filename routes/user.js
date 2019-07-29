const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.post("/signup", (req, res, next) => {
    console.log("1");
    console.log(req.body.email);
    User.find( { email : { $eq : req.body.email } } )
        .then(result => {
            res.status(200).json({
              result : result,
              message : "SUCCESS"
            });
        }).catch(err => {
            res.status(500).json(err);
        })
    });


router.post("/login", (req, res, next) => {
        User.find({ email: req.body.email })
          .exec()
          .then(user => {
            if (user.length < 1) {
              return res.status(401).json({
                message: "Auth failed"
              });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
              if (err) {
                return res.status(401).json({
                  message: "Auth failed"
                });
              }else{
                return res.status(201).json({
                    user :user[0],
                    message: "login"
                  });
              }
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
  });
    

module.exports = router;