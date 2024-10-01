const express = require('express')
const router = express.Router() 
const note = require('../model/notes')

router.post("/checked", async(req , res )=>{
    const bodyData = req.body
    const find = {_id : bodyData._id}
    let completed = bodyData.check?{ isCompleted : true } :{ isCompleted : false }
     try{
         const updateData = await note.findOneAndUpdate(find, completed)
         console.log(updateData)
         const data = await note.find()
         res.status(202).json(data)
    }catch(err){
        console.error(err)
    }
  })
  router.put('/updateNotes',async(req ,res)=>{
        const bodyData = req.body
        console.log(bodyData)
        // bodyData[0]._id
        try{
            const updateData = await note.findOneAndUpdate(bodyData[0], bodyData[1])
            console.log(updateData)
            const data = await note.find()
            res.status(202).json(data)
        }catch(err){
            res.status(501).json(err)
       }
  })
  module.exports = router ; 