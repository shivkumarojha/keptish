import express from "express"
import { addCategory, addNote, deleteCategory, deleteNote, getAllCategory, getNote, getPaginatedNotes, getPinnedNotes, pinNote, updateCategory, updateNote } from "../controllers/note.controller"
import authMiddleware from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Notes Router"
    })
})

// Note category related routes
router.post("/addCategory", authMiddleware, addCategory)
router.delete("/deleteCategory/:id", authMiddleware, deleteCategory)
router.put("/updateCategory/:id", authMiddleware, updateCategory)
router.get("/getAllCategory", authMiddleware, getAllCategory)

// Note related
router.post("/addNote", authMiddleware, addNote)
router.delete("/deleteNote/:id", authMiddleware, deleteNote)
router.put("/updateNote", authMiddleware, updateNote)
router.get("/getNote", authMiddleware, getNote)
router.get("/getPaginatedNotes", authMiddleware, getPaginatedNotes)
router.post("/pinNote", authMiddleware, pinNote)
router.get("/getPinnedNotes", authMiddleware, getPinnedNotes)

export default router