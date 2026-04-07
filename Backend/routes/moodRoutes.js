import express from "express"

import {saveMood,getMood} from "../controllers/moodController.js"

const router = express.Router()

router.post("/save",saveMood)

router.get("/all",getMood)

export default router