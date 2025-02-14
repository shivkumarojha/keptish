import express from "express"
import { changePassword, signup, singin } from "../controllers/auth.cotroller"

const router = express.Router()


router.post("/signin", singin)
router.post("/signup", signup)
router.post("/changePassword", changePassword)
export default router
