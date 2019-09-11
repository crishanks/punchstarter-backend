const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send({ user })
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(e) {
        res.send(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        //  Get and remove the specific token that was used when user authenticated
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(e) {
        res.send(500).send()
    }
})

router.post ('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        req.status(500).send()
    }
})

module.exports = router