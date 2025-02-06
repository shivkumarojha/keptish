import express from "express"
import { calender } from "../controllers/calender.controller"


const router = express.Router()

router.get("/", calender)

export default router