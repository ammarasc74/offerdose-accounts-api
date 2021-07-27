const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

exports.userLogin = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "user not found ",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(405).json({
            message: "Login failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              _id: user[0]._id,
            },
            "secret",
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth succecfull",
            token: token,
            userData: {
              _id: user[0]._id,
              name: user[0].name,
              email: user[0].email,
            },
          });
        }
        return res.status(406).json({
          message: "Auth Failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
