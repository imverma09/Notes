const express = require('express')
const router = express.Router() 
const note = require('../model/notes')
 
router.get("/", async(req, res)=>{
   const data =  await note.find()
    res.status(202).json(data)
})

 router.delete("/", async(req ,res)=>{
       const bodyData =   req.body
       try{
         const not = await note.findById(bodyData.idx)
           if(!not){
               res.status(400).json({err :"invalid Data"})
           }
           await not.deleteOne()
           const data = await note.find()
           res.status(202).json(data)
       }catch(err){
            res.status(400).json(err)
       }

 })
router.post("/", async(req , res )=>{
    const bodyData = req.body
     try{
         await note.create(bodyData)
         const data = await note.find()
         res.status(202).json(data)
    }catch(err){
        console.error(err)
    }
  })

  module.exports =router ;