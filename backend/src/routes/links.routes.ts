import express from "express"
import { links } from "../controllers/links.controller"

const router = express.Router()

router.get("/", links)

export default router