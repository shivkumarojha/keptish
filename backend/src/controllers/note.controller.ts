import { Request, Response } from "express";
import { categorySchemaValidator, noteSchemaValidator } from "../validators/note.validator";
import { User } from "../models/user.model";
import { Category, Note, PinnedNote } from "../models/note.model";
import { captureRejectionSymbol } from "events";

// Category related routes
const addCategory = async (req: Request, res: Response) => {
    const userId = req.id
    const parsedData = categorySchemaValidator.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid data",
            error: parsedData.error
        })
    }
    try {

        const newCategory = await Category.create({
            categoryName: parsedData.data.categoryName,
            userId: userId
        })

        return res.status(201).json({
            message: "Category created"
        })
    } catch (error) {
        return res.status(400).json({
            message: "couldn't process with the request, try after sometime",
            error: error

        })
    }
}
const deleteCategory = async (req: Request, res: Response) => {
    const categoryId: string = req.params.id
    try {
        const category = await Category.findOneAndDelete({
            _id: categoryId
        })
        if (!category) {
            return res.status(400).json({
                message: "Category doesn't exist"
            })
        }
        return res.status(200).json({
            message: "Category deleted succesfully"
        })
    } catch (error) {
        return res.status(422).json({
            message: "Something went wrong while deleting category",
            error: error
        })
    }

}

const updateCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id
    const categoryName = categorySchemaValidator.safeParse(req.body)
    try {
        const updateCategory = await Category.findOneAndUpdate(
            {
                _id: categoryId
            },
            {
                categoryName: categoryName
            },
            {
                new: true
            }

        )
        if (!updateCategory) {
            return res.status(400).json({
                message: "Category doesn't exists"
            })
        }
        return res.status(200).json({
            message: "Category updated."
        })
    } catch (error) {
        return res.status(404).json({
            message: "Some error occured while updating the category",
            error: error
        })
    }
}

const getAllCategory = async (req: Request, res: Response) => {
    const userId = req.id

    try {
        const allCategory = await Category.find({ userId })
        return res.status(200).json({
            message: "All categories",
            categories: allCategory
        })
    } catch (error) {
        return res.status(400).json({
            message: "Some error occured while fetching categories",
            error: error
        })
    }
}

// Notes related route
const addNote = async (req: Request, res: Response) => {
    const parsedData = noteSchemaValidator.safeParse(req.body)
    console.log(parsedData.data)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid values",
            error: parsedData.error
        })
    }
    const { title, description, images, categories } = parsedData.data
    try {
        const newNote = await Note.create({
            title,
            description,
            images,
            categories
        })

        if (!newNote) {
            return res.status(404).json({
                message: "Some error occured while adding new note"
            })
        }
        return res.status(201).json({
            message: "Note is created",
            note: newNote
        })

    } catch (error) {
        return res.status(400).json({
            message: "Some error occured while creating note",
            error: error
        })
    }
}

const deleteNote = async (req: Request, res: Response) => {
    const noteId = req.params.id
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: noteId
        })
        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            })
        }
        return res.status(200).json({
            message: "Note deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while deleting the note",
            error: error
        })
    }

}


const updateNote = async (req: Request, res: Response) => {
    const noteId = req.params.id
    const parsedData = noteSchemaValidator.partial().safeParse(req.body)
    try {
        const note = await Note.findOneAndUpdate(
            {
                _id: noteId
            },
            {
                ...parsedData.data
            },
            {
                new: true
            }
        )
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }
        return res.status(200).json({
            message: "Note updated"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Some error occured while updating the note",
            error: error
        })
    }
}

const getNote = async (req: Request, res: Response) => {
    const noteId = req.params.id
    try {
        const note = await Note.findOne({
            _id: noteId
        })
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }
        return res.status(200).json({
            message: "Notes fetched succesfully",
            note: note
        })
    } catch (error) {
        return res.status(500).json({
            message: "Some error occured while fetching note",
            error: error
        })
    }

}

// 10 notes at each scroll, something like that
const getPaginatedNotes = (req: Request, res: Response) => {

}

const pinNote = async (req: Request, res: Response) => {
    const noteId = req.params.id
    const userId = req.id
    try {
        const pinNote = await PinnedNote.findOneAndUpdate(
            {
                userId: userId,
                noteId: noteId
            },
            {
                userId,
                noteId
            },
            {
                new: true,
                upsert: true
            })
        if (!pinNote) {
            return res.status(400).json({
                message: "note already pinned",
            })
        }
        return res.status(200).json({
            message: "Note pinned"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while pinning note",
            error: error
        })
    }
}

const getPinnedNotes = async (req: Request, res: Response) => {
    const userId = req.id
    try {
        const pinnedNotes = await PinnedNote.find({ userId })
        if (!pinnedNotes) {
            return res.status(404).json({
                message: "There is not pinned Notes",
            })
        }
        return res.status(200).json({
            message: "Pinned notes fetched",
            pinnedNotes: pinnedNotes
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while fetching pinned notes",
            error: error
        })
    }
}

const unpinNote = async (req: Request, res: Response) => {
    const noteId = req.params.id
    try {
        const note = await PinnedNote.findOneAndDelete({
            noteId: noteId
        })
        if (!note) {
            return res.status(404).json({
                message: "Not pinned note.."
            })
        }
        return res.status(200).json({
            message: "Note unpinned"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while unpinning note",
            error: error
        })
    }
}

export {
    addCategory,
    deleteCategory,
    updateCategory,
    getAllCategory,
    addNote,
    deleteNote,
    updateNote,
    getNote,
    getPaginatedNotes,
    pinNote,
    getPinnedNotes,
    unpinNote
}