const express = require('express')
const route = express.Router()
const user = require('../model/singUp')
const bcrypt = require('bcrypt')
route.post('/sign', async (req, res) => {
    const data = req.body
    try {
        const salt = await bcrypt.genSalt()
        const newPassword = await bcrypt.hash(data.password, salt)
        data.password = newPassword
        await user.create(data)
        await user.find()
    } catch (err) {
        if (err.code == 11000) {
            res.status(401).json({ error: "Email And Number allReady exist ... !" })
        }
        res.status(501).json({ error: "something wrong ! " })
    }
})

route.post('/login', async (req, res) => {
    const data = req.body
    try {
        const find =  await user.findOne({ email: data.email })
        if (!find) {
            return res.status(401).json({ error: "invalid Email or password " })
        }
        const match =  await bcrypt.compare(data.password, find.password)
        if (!match) {
            return res.status(401).json({ error: "invalid Email or password " })
        }
        res.status(202).json({ msg: "Welcome back " })
    } catch (error) {
        res.status(501).json({ error: "Something wrong  try again" })
    }
    //   bcrypt.hash(data.password)
})
module.exports = route;