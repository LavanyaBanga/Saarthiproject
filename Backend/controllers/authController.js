import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{

try {
  const {name,email,password}=req.body

  if (!name || !email || !password) {
    return res.status(400).json({error: "All fields are required"})
  }

  const hashedPassword = await bcrypt.hash(password,10)

  const user = new User({
  name,
  email,
  password:hashedPassword
  })

  await user.save()

  res.status(201).json({message: "User Registered"})
} catch(error) {
  console.error("Register error:", error)
  res.status(500).json({error: error.message})
}

}


export const login = async(req,res)=>{

try {
  const {email,password}=req.body

  const user = await User.findOne({email})

  if(!user) return res.status(401).json({error: "User not found"})

  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch) return res.status(401).json({error: "Wrong password"})

  const token = jwt.sign(
  {id:user._id},
  "secretkey"
  )

  res.status(200).json({
  token,
  user
  })
} catch(error) {
  res.status(500).json({error: error.message})
}

}