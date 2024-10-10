const express = require('express')
const router = express.Router()
const note = require('../model/notes')
const jwt = require('jsonwebtoken')
const secret = 'QW!@AsZxer1%4#T^&*FCDT65$$#*)_+[[p;[]L>"}'

router.get("/", async (req, res) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(402).json({ msg: " something wrong" })
    }
    try {
        const cookieData = await jwt.verify(token, secret)
        const data = await note.find({ userId: cookieData._id })
        res.status(202).json(data)
    } catch (error) {
        res.status(501).json(error)
    }
})

router.delete("/", async (req, res) => {
    const bodyData = req.body
    const token = req.cookies.jwt
    try {
        const cookieData = await jwt.verify(token, secret)
        const findData =  await note.findOne({userId :  cookieData._id})
        const filter = { _id :findData._id}
        const updateData = { $pull: { notes : { _id : bodyData.idx} } }
         await note.updateOne( filter , updateData);
        const data = await note.findOne({ userId: cookieData._id })
        res.status(202).json(data)
    } catch (err) {
        res.status(400).json(err)
    }

})
router.post("/", async (req, res) => {
    const bodyData = req.body
    const token = req.cookies.jwt
    if (!token) {
        return res.status(402).json({ msg: "something wrong" })
    }
    try {
        const originalCookie = await jwt.verify(token, secret)
        bodyData.userId = originalCookie._id
        const updateData = await note.updateOne(
            { userId: originalCookie._id },
            { $push: { notes: bodyData } },
            { upsert: true }
        )
        const data = await note.findOne({ userId: originalCookie._id })
        // console.log(data)
        res.status(202).json(data)
    } catch (err) {
        console.error(err)

    }
})

module.exports = router;