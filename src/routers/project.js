const express = require('express')
const Project = require('../models/project')
const router = new express.Router()

router.post('/projects', async (req, res) => {
    const project = new Project(req.body)

    try {
        await project.save()
        res.status(201).send({ project })
    } catch(e) {
        res.send(400).send()
    }
})

module.exports = router