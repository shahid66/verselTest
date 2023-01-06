const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const helmet=require('helmet')
const path = require("path");
const router = require('./routes/userAPI');
const dotenv=require('dotenv').config();
const app=express()

app.use(cors())
// app.use(cors({credentials:true, origin:'http://taskmanagertwo.khandokershahid.com'}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("uploads"))
app.use(router)
app.use('/',(req,res)=>{
    res.json({message:"Hello"})
})

const PORT=5000;
mongoose.connect(process.env.DATABASE).then(()=>console.log("DB connect successfull")).catch((err)=>console.log("DB Error =>", err))

app.listen(PORT,()=>{
    console.log("App is running")
})

