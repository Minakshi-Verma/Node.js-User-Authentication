const express = require("express");

const server = express();

server.use(express.json());  //it will allow our application to accept json

//testing
server.get("/", (req,res)=>{
    res.status(200).json({message: "api is running properly"})
})

module.exports = server;
