import express from "express"
import { pomodoro } from "../controllers/pomodoro.controller"

const router = express.Router()

router.get("/", pomodoro)

export default router