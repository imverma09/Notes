const express = require('express')
const router = express.Router() 
const note = require('../model/notes')
 
router.get("/", async(req, res)=>{
   const data =  await note.find()
    res.status(202).json(data)
})


router.post("/", async(req , res )=>{
    const bodyData = req.body
    try{
         await note.create(bodyData)
         const data =   await note.find()
         res.status(202).json(data)
    }catch(err){
        console.log(err)
    }
  })

  module.exports =router ;