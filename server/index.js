const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app= express();
const db= require('./server/index')
const userRouter = require('./routes/user-router')
const apiPort =3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(bodyParser.json())
db.on("error", () => dbLogError("Database connection failure")); 
app.get('/',(req,res) => {
    res.send('hello world')
});


app.use('/api', userRouter)
app.listen(apiPort,()=>console.log(`${apiPort}`))