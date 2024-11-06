import { Request, Response } from "express";

// Routes related to lists
const addList = (req: Request, res: Response) => {
}

const deleteList = (req: Request, res: Response) => {
}

const updateList = (req: Request, res: Response) => {
}

const getAllList = (req: Request, res: Response) => {
}

const pinList = (req: Request, res: Response) => {
}

const getPinnedLists = (req: Request, res: Response) => {
}

// Routes related to tasks
const addTask = (req: Request, res: Response) => {
}

const deleteTask = (req: Request, res: Response) => {
}

const updateTask = (req: Request, res: Response) => {
}

const getAllTask = (req: Request, res: Response) => {
}

const getTaskByList = (req: Request, res: Response) => {
}

// 10 tasks at each scroll, something like that
const getPaginatedTasks = (req: Request, res: Response) => {
}

export {
    addList,
    pinList,
    deleteList,
    updateList,
    getAllList,
    getPinnedLists,
    addTask,
    deleteTask,
    updateTask,
    getAllTask,
    getTaskByList,
    getPaginatedTasks
}