const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const note = require('./router/notes')
const update = require('./router/update')
const signUp =  require('./router/signUp')
const app =  express()
app.use(express.json())
const port = 4000 ;
app.use(
    cors({
      origin: "*",
      credentials:true, 
    })
  );
  
app.use('/' , note)  
app.use("/" , signUp)  
app.use("/" ,update)

mongoose.connect('mongodb://localhost:27017/notes')
.then(()=>{
  app.listen(port , ()=>{
      console.log('server start ' + port);
  })
})
.catch(err => console.log(err))