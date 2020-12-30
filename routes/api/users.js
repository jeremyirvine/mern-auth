const express = require('express')
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const keys = require("../../config/keys")

const validateLoginInput = require("../../validation/login")
const validateRegisterInput = require('../../validation/register')

const User = require("../../models/User")

router.post("/register", (req, res) => {
    let validation = validateRegisterInput(req.body)

    if (!validation.isValid)
        res.status(400).json({ message: "Failed Verification", error: validation.errors }).end()

    User.findOne({ email: req.body.email }).then(user => {
        if (user)
            return res.status(400).json({ message: "err_user_exists" })

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    })
})

router.post('/login', (req, res) => {
    // Form validation
    let validation = validateLoginInput(req.body)

    if (!validation.isValid)
        res.status(400).json({ message: "Failed Verification", error: validation.errors })

    // Find user by email
    User.findOne({ email: req.body.email }).then(user => {
        if (!user)
            return res.status(404).json({ error: { emailnotfound: "Email not found" } })

        bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
                if (!isMatch)
                    return res.status(400).json({ error: { incorrectcredentials: "Incorrect Email or Password" } })

                const payload = {
                    id: user.id,
                    name: user.name
                }

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => res.json({ success: true, token: `Bearer ${token}` })
                )
            })
    })


})

module.exports = router