const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
const Transaction=require('./models/Transaction.js')
const mongoose =require("mongoose")
require('dotenv').config()

const app=express()



app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())


app.get('/api/test',(req,res)=>{
    res.send("test ok")
})

app.post("/api/transaction", async (req,res)=>{

    await mongoose.connect(process.env.MONGO_URL)
    const {price,name,description,datetime}=req.body
    const transaction= await Transaction.create({price,name,description,datetime})
    console.log(transaction)
    // console.log(dateTime)
})


app.listen(4000,(req,res)=>{
    console.log("server listen at port 4000")
})

app.get('/api/transactions',async (req,res)=>{
    await mongoose.connect(process.env.MONGO_URL)
    const transactions=await  Transaction.find()
    res.json(transactions);
})


// rajput16naman
// gxth5Lcbbam3ez1d