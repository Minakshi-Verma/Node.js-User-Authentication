const express = require("express");
const users = require("./data/data")
const bcrypt = require('bcrypt')

const server = express();



server.use(express.json());  //it will allow our application to accept json
  


//testing
server.get("/", (req,res)=>{
    res.status(200).json({message: "api is running properly"})
})
//-----GET request---------
server.get("/users",(req,res)=>{
  res.json(users)  
})
//-------POST request------

server.post("/users", async(req,res)=>{  //bcrypt is a async fx    
    try{
        const salt = await bcrypt.genSalt()  //you can type in any number in () default is 10
   
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // console.log(salt)
        // console.log(hashedPassword)

        const user = {name: req.body.name, password:hashedPassword}
        users.push(user)
        res.status(201).send(user)
        // hash(salt + "password")
        //  hash(salt2 +"password")  results in different password for each user
      
    }catch{
        res.status(500).send()
    }    
})

//----------------login endpoint--------

server.post("/users/login", async(req,res)=>{
    const user = users.find(user=>user.name = req.body.name)
     if(user == null){
         return res.status(400).send('Cannot find user')
     }
     try{
        if(await bcrypt.compare(req.body.password,user.password)){
            res.send('Success')
        }else{
            res.send('Not allowed')
        }
     }catch{
         res.status(500).send()
     }
})


module.exports = server;
