const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.post("/", (req, res, next) => {
    console.log('req.body.photo :', req.body.photo);
        User.updateOne(
            { _id: req.body.userId },
            { $set:
               {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                fullName: req.body.fullName,
                City: req.body.City,
                State: req.body.State,
                Zip: req.body.Zip,
                photo: req.body.photo,
               }
            }).exec()
            .then((result) => {
                res.status(200).json({
                    user: result,
                    message: "SUCCESS"
                  });
            }).catch((err) => {
                res.status(500).json(err);

            });
  });

module.exports = router;
