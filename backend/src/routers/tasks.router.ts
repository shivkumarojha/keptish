import express from "express"
import { addList, addTask, deleteList, deleteTask, getAllList, getAllTask, getPaginatedTasks, getPinnedLists, getTaskByList, pinList, unPinList, updateList, updateTask } from "../controllers/task.controller"
import authMiddleware from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Task Router"
    })
})


router.post("/addList", authMiddleware, addList)
router.delete("/deleteList", authMiddleware, deleteList)
router.put("/updateList/:id", authMiddleware, updateList)
router.get("/getAllList", authMiddleware, getAllList)
router.post("/pinList/:id", authMiddleware, pinList)
router.delete("/unPinList/:id", authMiddleware, unPinList)
router.get("/getPinnedLists", authMiddleware, getPinnedLists)

// Task related routes
router.post("/addTask", authMiddleware, addTask)
router.delete("/deleteTask", authMiddleware, deleteTask)
router.post("/updateTask", authMiddleware, updateTask)
router.get("/getAllTask", authMiddleware, getAllTask)
router.get("/getTaskByList", authMiddleware, getTaskByList)
router.get("/getPaginatedTasks", authMiddleware, getPaginatedTasks)

export default router