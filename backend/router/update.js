const express = require('express')
const router = express.Router()
const note = require('../model/notes')
const jwt = require('jsonwebtoken')
const notes = require('../model/notes')
const secret = 'QW!@AsZxer1%4#T^&*FCDT65$$#*)_+[[p;[]L>"}'

router.post("/checked/:userId", async (req, res) => {
    const bodyData = req.body;
    const myId = req.params.userId;
    if (!myId) {
        res.status(401).json({ err: " user not found...! " })
    }
    const find = { userId: myId, 'notes._id': bodyData._id }
    const update = { $set: { 'notes.$.isCompleted': bodyData.check } }
    try {
        await note.updateOne(find, update)
        const data = await note.findOne({ userId: myId });
        res.status(202).json(data)
    } catch (err) {
        console.error(err)
    }
})

router.put('/updateNotes', async (req, res) => {
    const bodyData = req.body
    const token = req.cookies.jwt
    try {
        const verifyToken = await jwt.verify(token, secret)
        const filter = { userId: verifyToken._id, 'notes._id': bodyData.id }
        const update = { $set: { 'notes.$.title': bodyData.title, 'notes.$.description': bodyData.description } }
        await note.updateOne(filter, update);
        const data = await note.findOne({ userId: verifyToken._id });
        res.status(202).json(data)
    } catch (err) {
        console.log(err)
        res.status(501).json(err)
    }
})
module.exports = router; 