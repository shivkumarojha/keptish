import { Request, Response } from "express";

// Category related routes
const addCategory = (req: Request, res: Response) => {

}

const deleteCategory = (req: Request, res: Response) => {

}

const updateCategory = (req: Request, res: Response) => {

}

const getAllCategory = (req: Request, res: Response) => {

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