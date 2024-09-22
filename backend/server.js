const express = require('express') 
const cors = require('cors')
const app =  express()
app.use(express.json())
const port = 4000 ;
app.use(
    cors({
      origin: "*",
    })
  );
 const  notes = [ { category: 'Business', title: 'Finish the task on the board', description: 'Remember to finish task on the board. After finishing give for evaluation Matt.', date: '22.01.2023' }]

app.get("/",(req, res)=>{
   res.status(202).json(notes)
})

app.post("/",(req , res )=>{
  const bodyData = req.body
  if (bodyData.ctg && bodyData.ctg == "all") {
    res.status(202).json(notes)
  }
  const filterNotes = notes.filter(note => note.category.toLowerCase() == bodyData.ctg && bodyData.ctg.toLowerCase())
  if (filterNotes.length > 0 ) {
     return res.status(202).json(filterNotes)
  }
  if (bodyData.category && true) {
     notes.push(bodyData)
     return res.status(202).json(notes)
  }
})

app.listen(port , ()=>{
    console.log('server start ' + port);
})