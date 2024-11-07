import { Request, Response } from "express";
import { categorySchema } from "../validators/note.validator";
import { User } from "../models/user.model";
import { Category } from "../models/note.model";

// Category related routes
const addCategory = async (req: Request, res: Response) => {
    const userId = req.id
    const parsedData = categorySchema.safeParse(req.body)

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
const deleteCategory = (req: Request, res: Response) => {

}

const updateCategory = (req: Request, res: Response) => {

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
const addNote = (req: Request, res: Response) => {

}

const deleteNote = (req: Request, res: Response) => {

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