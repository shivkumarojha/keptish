import express from "express"
import { addCategory, addNote, deleteCategory, deleteNote, getAllCategory, getNote, getPaginatedNotes, getPinnedNotes, pinNote, updateCategory, updateNote } from "../controllers/note.controller"

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Notes Router"
    })
})

// Note category related routes
router.post("/addCategory", addCategory)
router.delete("/deleteCategory", deleteCategory)
router.put("/updateCategory", updateCategory)
router.get("/getAllCategory", getAllCategory)

// Note related
router.post("/addNote", addNote)
router.delete("/deleteNote", deleteNote)
router.put("/updateNote", updateNote)
router.get("/getNote", getNote)
router.get("/getPaginatedNotes", getPaginatedNotes)
router.post("/pinNote", pinNote)
router.get("/getPinnedNotes", getPinnedNotes)

export default router