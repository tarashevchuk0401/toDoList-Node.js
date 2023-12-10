const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
    const hash = bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                id: req.body.id,
                email: req.body.email,
                password: hash,
                name: req.body.name,
            })
            console.log(user)
            user.save()
                .then(result => {
                    if (!result) {
                        return res.status(401).json({
                            message: 'Failed'
                        })
                    }

                    const token = jwt.sign({
                        email: result.email,
                        userId: result.id
                    }, 'secret_this_should_be_longer', { expiresIn: "1h" });

                    return res.status(200).json({
                        token: token,
                        expiresIn: 3600,
                        userId: result.id
                    })
                })
                .catch(error => {
                    return res.status(400).json({
                        message: 'Rigistration failed. Email already exist'
                    })
                })
        })
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(401).json({
                    message: 'Email not found'
                })
            }
            fetchedUser = user;

            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Email not found or wrong password'
                })
            }

            const token = jwt.sign({
                email: fetchedUser.email,
                userId: fetchedUser.id
            }, 'secret_this_should_be_longer', { expiresIn: "1h" });

            return res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser.id
            })
        })
        
}