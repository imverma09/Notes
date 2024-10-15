const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const note = require('./router/notes')
const update = require('./router/update')
const signUp =  require('./router/signUp')
const app =  express()

const port = 4000 ;
app.use(
    cors({
      origin:[ "http://localhost:3000", "https://notes-app11.vercel.app"],
      credentials: true, 
    })
  );

  app.use(cookieParser());
  app.use(express.json())
  
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