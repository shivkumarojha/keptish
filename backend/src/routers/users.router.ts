import express from "express"
import { changePassword, signin, signup } from "../controllers/user.controller"
import authMiddleware from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        message: "user router"
    })
})


router.post("/signin", signin)
router.post("/signup", signup)
router.post("/change-password", authMiddleware, changePassword)


export default router