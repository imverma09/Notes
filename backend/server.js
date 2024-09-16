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
  notes.push(bodyData)
  res.status(202).json(notes)
})

app.listen(port , ()=>{
    console.log('server start ' + port);
})