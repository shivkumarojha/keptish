import express from "express"
import { journal } from "../controllers/journal.controller"

const router = express.Router()

router.get("", journal)

export default router