import express from "express"
import { notes } from "../controllers/notes.cotroller"

const router = express.Router()

router.get("/", notes)

export default router