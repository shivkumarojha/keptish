import express from "express"
import { singin } from "../controllers/auth.cotroller"

const router = express.Router()


router.post("/signin", singin)

export default router
