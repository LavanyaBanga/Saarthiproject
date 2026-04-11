
import mongoose from "mongoose"

const moodSchema = new mongoose.Schema({

mood:{
type:String,
required:true
},

confidence:{
type:Number,
default:0.9
},

score:{
type:Number
}

},{
timestamps:true
})

export default mongoose.model("Mood",moodSchema)