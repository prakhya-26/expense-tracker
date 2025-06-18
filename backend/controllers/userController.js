import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// user login

const loginUser = async(req,res)=>{
    try{
        //take input from the request
        const {email, password} = req.body
        
        //check if user exists in the database
        const user = await userModel.findOne({email})
        if(user){
            //check if the pwd is correct
            const isMatch = await bcrypt.compare(password,user.password)
            //if password is correct generate authetication tokens
            if(isMatch){
                const token = createToken(user._id)
                return res.json({success:true, token})
            }
            else{
                return res.json({success : false, message : "Invalid password"})
            }
        }
        else{
            return res.json({
                success : false,
                message : "User dosen't not exist.",
                showRegister : true
            })
        }
    }
    catch(error){
        console.log(error)
        res.json({success:false,message : error.message})
    }
}

//user signin/registration

const registerUser = async (req,res)=>{
    try{
        //get the details of the user
        const {name,email,password} = req.body

        //check if user already exists

        const exists = await userModel.findOne({email})

        if(exists){
            return res.json({success : true, message : "User already exists"})
        }
        else{
            if(!validator.isEmail(email)){
                return res.json({success:true,message:"please enter valid email"})
            }
            if(!validator.isStrongPassword(password)){
                return res.json({success:false,message:"enter strong password"})
            }

            // bcrypt the password to hash before saving in db
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)

            const newUser = new userModel({
                name,
                email,
                password : hashedPassword,
            })
            const user = await newUser.save()

            //create token for authetication of teh new user
            const token = createToken(user._id)
            res.json({success: true, token})
        }

    }
    catch(error){
        console.log(error)
         res.json({success:false,message : error.message})
    }
}

export {loginUser,registerUser}