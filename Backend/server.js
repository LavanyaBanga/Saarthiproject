import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js"
import moodRoutes from "./routes/moodRoutes.js"

dotenv.config()

const app = express()

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}))
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/mood", moodRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err)
  res.status(500).json({ error: err.message || "Server error" })
})

// MongoDB Connection with better error handling
mongoose.connect("mongodb://127.0.0.1:27017/saarthi")
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => {
  console.error("MongoDB Connection Error:", err.message)
  process.exit(1)
})

app.listen(5000, () => {
console.log("Server running on port 5000")
})