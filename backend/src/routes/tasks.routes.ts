import express from "express"
import { tasks } from "../controllers/tasks.controller"

const router = express.Router()

router.get("/", tasks)

export default router