import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";

import {
ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
Legend
} from "recharts";

const emojis = [
{ mood: "Happy", emoji: "😊", score: 4.8 },
{ mood: "Sad", emoji: "😔", score: 2.5 },
{ mood: "Angry", emoji: "😡", score: 2.2 },
{ mood: "Neutral", emoji: "😐", score: 3.5 },
];

export default function MoodTracker(){

const [page,setPage]=useState("mood")
const [history,setHistory]=useState([])
const [selectedMood,setSelectedMood]=useState(null)

const totalReviews = history.reduce((sum, item) => sum + (item.count || 0), 0)
const overallRating = totalReviews
  ? history.reduce((sum, item) => sum + (item.avgScore || 0) * (item.count || 0), 0) / totalReviews
  : 0
const last7History = history.slice(-7)
const last7Reviews = last7History.reduce((sum, item) => sum + (item.count || 0), 0)
const last7Avg = last7Reviews
  ? last7History.reduce((sum, item) => sum + (item.avgScore || 0) * (item.count || 0), 0) / last7Reviews
  : 0

const videoRef = useRef(null)
const [cameraOn,setCameraOn]=useState(false)

const fetchHistory = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/mood/all")
    const data = await res.json()

    const normalized = data.map((item, index) => {
      const createdAt = item.createdAt || item.date || item.day || null
      const dateValue = createdAt ? new Date(createdAt) : null
      const isValidDate = dateValue && !isNaN(dateValue.getTime())
      
      const dayLabel = isValidDate
        ? new Date(dateValue).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })
        : `Entry ${index + 1}`
      const dayKey = isValidDate
        ? new Date(dateValue).toISOString().split("T")[0]
        : `entry-${index}`

      const moodMap = {
        Happy: 4.8,
        Neutral: 3.5,
        Sad: 2.5,
        Angry: 2.2,
      }
      const numericMood = Number(item.mood)
      const scoreValue = Number(item.score)
      const moodValue = Number.isFinite(numericMood)
        ? numericMood
        : Number.isFinite(scoreValue)
        ? scoreValue
        : moodMap[item.mood] ?? 3

      return {
        day: dayLabel,
        dayKey,
        score: moodValue,
      }
    })

    const grouped = normalized.reduce((acc, item) => {
      if (!acc[item.dayKey]) {
        acc[item.dayKey] = {
          day: item.day,
          dayKey: item.dayKey,
          sum: 0,
          count: 0,
        }
      }
      acc[item.dayKey].sum += item.score
      acc[item.dayKey].count += 1
      return acc
    }, {})

    const chartData = Object.values(grouped)
      .sort((a, b) => a.dayKey.localeCompare(b.dayKey))
      .map((group) => ({
        day: group.day,
        avgScore: group.sum / group.count,
        count: group.count,
      }))

    setHistory(chartData)
  } catch (error) {
    console.error("Failed to load mood history", error)
  }
}

// Load History
useEffect(()=>{
  fetchHistory()
},[])


const startCamera = async()=>{

const stream = await navigator.mediaDevices.getUserMedia({
video:true
})

setCameraOn(true)

setTimeout(()=>{
videoRef.current.srcObject = stream
},300)

}


const saveMood = async (mood, score) => {
  try {
    await fetch("http://localhost:5000/api/mood/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood,
        score,
        confidence: 0.92,
      }),
    });

    await fetchHistory();
  } catch (error) {
    console.error("Failed to save mood", error);
  }
};


const detectMood = ()=>{

const moods=["Happy","Sad","Neutral","Angry"]

const randomMood = moods[Math.floor(Math.random()*4)]

const scoreMap={
Happy:4.8,
Sad:2.5,
Angry:2.2,
Neutral:3.5
}

setSelectedMood(randomMood)

saveMood(randomMood,scoreMap[randomMood])

}



const handleSelectEmoji = (e)=>{

setSelectedMood(e.mood)

saveMood(e.mood,e.score)

}


const handleReset = ()=>{

setHistory([])
setSelectedMood(null)

}



return(

<div className="flex h-screen">

<motion.aside className="w-64 border-r p-4">

<h2 className="text-xl font-bold mb-4">
Mood Tracker
</h2>

<div className="flex flex-col gap-3">

<button 
onClick={()=>setPage("mood")}
className="text-left px-3 py-2 rounded hover:bg-gray-100"
>
Camera
</button>

<button 
onClick={()=>setPage("reports")}
className="text-left px-3 py-2 rounded hover:bg-gray-100"
>
Reports
</button>

</div>

</motion.aside>

<div className="flex-1 p-6">

<Button onClick={handleReset}>
Reset
</Button>

{page==="mood" && (

<div className="grid grid-cols-2 gap-6">

<Card>

<CardHeader>
<CardTitle>
Camera Mood Detection
</CardTitle>
</CardHeader>

<CardContent>

<div className="h-72 border rounded flex items-center justify-center">

{cameraOn ? (

<video
ref={videoRef}
autoPlay
className="w-full h-full object-cover"
/>

):"Camera Off"}

</div>

<div className="flex gap-3 mt-4">

<Button onClick={startCamera}>
<Camera className="mr-2"/> Start
</Button>

<Button onClick={detectMood}>
Detect Mood
</Button>

</div>

{selectedMood && (

<div className="mt-4 font-medium">

Detected Mood : {selectedMood}

</div>

)}

</CardContent>

</Card>

<Card>

<CardHeader>
<CardTitle>
Manual Emoji
</CardTitle>
</CardHeader>

<CardContent>

<div className="grid grid-cols-4 gap-4">

{emojis.map(e=>(

<button
key={e.mood}
onClick={()=>handleSelectEmoji(e)}
className="p-3 border rounded hover:shadow transition"

>

<div className="text-2xl">{e.emoji}</div>
<div>{e.mood}</div>

</button>

))}

</div>

</CardContent>

</Card>

</div>

)}

{page==="reports" && (

<div className="mt-6">

<h2 className="text-xl font-semibold mb-4">
Mood Reports
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
  <div className="rounded-lg border p-4 bg-white shadow-sm">
    <div className="text-sm text-gray-500">Overall Rating</div>
    <div className="text-2xl font-semibold text-violet-700">{overallRating ? overallRating.toFixed(1) : "0.0"}</div>
  </div>
  <div className="rounded-lg border p-4 bg-white shadow-sm">
    <div className="text-sm text-gray-500">Total Reviews</div>
    <div className="text-2xl font-semibold text-violet-700">{totalReviews}</div>
  </div>
  <div className="rounded-lg border p-4 bg-white shadow-sm">
    <div className="text-sm text-gray-500">Last 7 days avg</div>
    <div className="text-2xl font-semibold text-violet-700">{last7Avg ? last7Avg.toFixed(1) : "0.0"}</div>
  </div>
</div>

<Card>

<CardHeader>
<CardTitle>
Mood Analytics
</CardTitle>
</CardHeader>

<CardContent>

<div className="h-[350px]">

<ResponsiveContainer width="100%" height="100%">
  <LineChart data={history}>
    <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
    <XAxis dataKey="day" tick={{ fontSize: 12 }} interval={0} />
    <YAxis domain={[0, 5]} tickCount={6} tick={{ fontSize: 12 }} />
    <Tooltip contentStyle={{ borderRadius: 8 }} />
    <Legend verticalAlign="top" height={36} />
    <Line
      type="monotone"
      dataKey="avgScore"
      name="Average Rating"
      stroke="#7C6A9B"
      strokeWidth={3}
      dot={{ r: 5 }}
      activeDot={{ r: 8 }}
    />
  </LineChart>
</ResponsiveContainer>

</div>

</CardContent>

</Card>

</div>

)}

</div>

</div>

)

}
