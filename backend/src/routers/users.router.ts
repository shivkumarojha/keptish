import express from "express"
import { changePassword, signin, signup } from "../controllers/user.controller"

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        message: "user router"
    })
})


router.post("/sigin", signin)
router.post("/sigup", signup)
router.post("/change-password", changePassword)


export default router