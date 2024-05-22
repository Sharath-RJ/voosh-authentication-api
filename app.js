const express= require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const bodyparser=require('body-parser');
const authRoutes =require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
dotenv.config()
//initializing express application
const app=express();

//connnecting to  mongodb database
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("connected to mongodb")
}).catch((error)=>{
    console.log("unable to connect to mongodb",error)
})

//using middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//route handling

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)


//server configuration

const PORT = process.env.PORT | 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

