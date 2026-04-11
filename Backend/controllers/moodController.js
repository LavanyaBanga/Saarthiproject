
import Mood from "../models/Mood.js"


export const saveMood = async(req,res)=>{

try{

const {mood,confidence,score} = req.body

const newMood = new Mood({
mood,
confidence,
score
})

await newMood.save()

res.json("Mood Saved")

}catch(error){

console.log(error)
res.status(500).json("Error saving mood")

}

}



export const getMood = async(req,res)=>{

try{

const moods = await Mood.find().sort({createdAt:1})

const formatted = moods.map(m => ({

day: new Date(m.createdAt).toLocaleDateString("en-IN",{
day:"numeric",
month:"short"
}),

mood: m.score || 3

}))

res.json(formatted)

}catch(error){

console.log(error)
res.status(500).json("Error fetching mood")

}

}