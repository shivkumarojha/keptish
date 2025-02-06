import express from "express"
import { singin } from "../controllers/auth.cotroller"

const router = express.Router()


router.get("/signin", singin)

export default router
