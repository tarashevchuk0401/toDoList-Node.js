const express = require('express');
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// router.post('/signup', (req, res, next) => {
//     const hash = bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = new User({
//                 id: req.body.id,
//                 email: req.body.email,
//                 password: hash,
//                 name: req.body.name,
//             })
//             user.save()
//                 .then(result => {
//                     res.status(200).json({
//                         message: 'New user created',
//                         result: result,
//                     })
//                 })
//                 .catch(error => {
//                     res.status(500).json({
//                         error: error
//                     })
//                 })
//         })
// })
router.post('/signup', (req, res, next) => {
    const hash = bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                id: req.body.id,
                email: req.body.email,
                password: hash,
                name: req.body.name,
            })
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
                }).catch(error => {
                    return res.status(400).json({
                        message: error
                    })
                })
        })
})

router.post('/login', (req, res, next) => {
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
                    message: 'Email not found'
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
        .catch(err => {
            //  res.status(401).json({
            //     message: "Authorization failed"
            // })
        })
})

module.exports = router;