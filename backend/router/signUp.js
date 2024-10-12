const express = require('express')
const route = express.Router()
const user = require('../model/singUp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'QW!@AsZxer1%4#T^&*FCDT65$$#*)_+[[p;[]L>"}'
// const app =  express()

route.post('/sign', async (req, res) => {
    const data = req.body
    try {
        const salt = await bcrypt.genSalt()
        const newPassword = await bcrypt.hash(data.password, salt)
        data.password = newPassword
        const newUser = await user.create(data)
        const token = jwt.sign({ _id: newUser._id }, secret)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        })
        res.status(201).json(newUser)
    } catch (err) {
        if (err.code == 11000) {
            return res.status(401).json({ error: "Email And Number allReady exist ... !" })
        }
        res.status(501).json({ error: "something wrong ! " })
    }
})

route.post('/login', async (req, res) => {
    const data = req.body
    try {
        const find = await user.findOne({ email: data.email })
        if (!find) {
            return res.status(401).json({ error: "invalid Email or password " })
        }
        const match = await bcrypt.compare(data.password, find.password)
        if (!match) {
            return res.status(401).json({ error: "invalid Email or password " })
        }
        const token = jwt.sign({ _id: find._id }, secret)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(202).json(find)
    } catch (error) {
        res.status(501).json({ error: "Something wrong  try again" })
    }
})

route.get('/check', async (req, res) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(401).json({ error: "invalid" })
    }
    try {
        const data = await jwt.verify(token, secret)
        const user2 = await user.findById(data._id)
        if (user2) {
            res.status(202).json({ message: "ok" })
        } else {

            res.status(401).json({ error: 'invalid token' })
        }
    } catch (error) {
        res.status(401).json({ error: 'invalid token' })
        // console.log(error)
    }

})
route.get('/logout', async (req, res) => {
    const token = req.cookies.jwt
    if (token) {
        res.clearCookie('jwt')
        res.status(202).json({msg : "ok"})
    }
    else {
        res.status(401).json({ error: 'you don not have any token to logout' })
    }
})

module.exports = route;