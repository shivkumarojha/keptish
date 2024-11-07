import { Request, Response } from "express";
import { categorySchemaValidator, noteSchemaValidator } from "../validators/note.validator";
import { User } from "../models/user.model";
import { Category, Note } from "../models/note.model";

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
    
}

const updateNote = (req: Request, res: Response) => {

}

const getNote = (req: Request, res: Response) => {

}

// 10 notes at each scroll, something like that
const getPaginatedNotes = (req: Request, res: Response) => {

}

const pinNote = (req: Request, res: Response) => {

}

const getPinnedNotes = (req: Request, res: Response) => {

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
    getPinnedNotes
}