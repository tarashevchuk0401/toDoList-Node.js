const express = require('express');
const User = require('../models/user.model')
const bcrypt = require('bcrypt');

const router = express.Router();

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
                    res.status(200).json({
                        message: 'New user created',
                        result: result,
                    })
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    })
                })
        })
})

module.exports = router;