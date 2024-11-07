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
router.post("/addNote", addNote)
router.delete("/deleteNote", deleteNote)
router.put("/updateNote", updateNote)
router.get("/getNote", getNote)
router.get("/getPaginatedNotes", getPaginatedNotes)
router.post("/pinNote", pinNote)
router.get("/getPinnedNotes", getPinnedNotes)

export default router