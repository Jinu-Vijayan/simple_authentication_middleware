const express = require("express");

const PORT = 4000;

const app = express();

const userData = [];

function autherizationMiddleware(req,res,next){
    const userExists = userData.find(elem => req.body.email === elem.email && req.body.password === elem.password);
    if(userExists){
        next();
    } else{
        res.status(401).json({
            error : "INVALID CREDENTIALS"
        })
    }
}

app.use(express.json());

app.post('/signUp',(req,res)=>{
    userData.push(req.body);
    res.status(201).json({
        message: "User created succesfully"
    })
})

app.get("/signIn",autherizationMiddleware,(req,res)=>{
    res.status(200).json({
        message : "sign in success"
    })
})

app.use("/*",(req,res)=>{
    res.status(404).json({
        error : "Path not found"
    })
})

app.listen(PORT, ()=>{
    console.log(`Express server up and running at port ${PORT}`);
})