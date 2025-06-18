import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
//import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import expenseRouter from './routes/expenseRoute.js'

// App Config
dotenv.config();

const app = express() // creating instance of express server
const port = process.env.PORT || 4000
connectDB()
//connectCloudinary()
// Middlewares

app.use(express.json())// to parse JSON bodies
app.use(express.urlencoded({ extended: true })) 
app.use(cors()) // to enable CORS for all routes

//api endpoinst

app.use('/api/user',userRouter)
app.use('/api/expense',expenseRouter)
app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port,()=> console.log("Server started on port : " + port))