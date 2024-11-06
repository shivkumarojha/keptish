import express from "express"
import { addList, addTask, deleteList, deleteTask, getAllList, getAllTask, getPaginatedTasks, getPinnedLists, getTaskByList, pinList, updateList, updateTask } from "../controllers/task.controller"

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Task Router"
    })
})


router.post("/addList", addList)
router.post("/pinCategory", pinList)
router.delete("/deleteList", deleteList)
router.post("/updateList", updateList)
router.get("/getAllList", getAllList)
router.get("/getPinnedCategory", getPinnedLists)

// Task related routes
router.post("/addTask", addTask)
router.delete("/deleteTask", deleteTask)
router.post("/updateTask", updateTask)
router.get("/getAllTask", getAllTask)
router.get("/getTaskByList", getTaskByList)
router.get("/getPaginatedTasks", getPaginatedTasks)

export default router