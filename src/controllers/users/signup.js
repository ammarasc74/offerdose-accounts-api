const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");

exports.userSignUp = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      } else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            user.save().then((result) => {
              result = res.status(201).json({
                message: "Success! User Created",
              });
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(502).json({
        error: err,
        message: "Signup failed",
      });
    });
};
