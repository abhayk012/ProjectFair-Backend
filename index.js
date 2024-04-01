// import dotenv
require('dotenv').config()
// import express
const express=require("express")

// import connection
require('./DB/connections')

// import cors 
const cors=require("cors")
const router = require('./Routes/router')
// create server 
const pfserver=express()
// make use of cors by server 
pfserver.use(cors())

//6 use middleware,to convert json to javascript object
pfserver.use(express.json());
// use router
pfserver.use(router)

// pfserver should expose the path uploads to get image
pfserver.use('/uploads',express.static("./uploads"))

//7 define Port
const PORT=4000;

//8 run the server
pfserver.listen(PORT,()=>{
    console.log(`Server is running successfully at port :${PORT}`);
})

pfserver.get('/',(req,res)=>{
    res.send("project fair server ready and running")
})