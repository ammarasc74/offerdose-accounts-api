const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../../models/users/user');


exports.userLogin = (req, res) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "user not found "
                });
            }
            bcrypt
                .compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(405).json({
                            message: "Login failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            _id: user[0]._id
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: "Auth succecfull",
                            token: token
                        });
                    }
                    return res.status(406).json({
                        message: "Auth failed"
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}