import { Request, Response } from "express";
import { taskListSchema } from "../validators/task.validator";
import { List, PinnedList } from "../models/task.model";

// Routes related to lists
const addList = async (req: Request, res: Response) => {
    const parsedData = taskListSchema.safeParse(req.body)
    const userId = req.id
    if (!parsedData.success) {
        return res.status(400).json({
            message: parsedData.error.message
        })
    }
    const { listName } = parsedData.data
    try {
        const list = await List.create({
            userId,
            listName
        })
        if (!list) {
            return res.status(400).json({
                message: "Something went wrong while creating list"
            })
        }
        return res.status(200).json({
            message: "List added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while adding list",
            error
        })
    }

}

const deleteList = async (req: Request, res: Response) => {
    const listId = req.params.listId
    try {
        const list = await List.findOneAndDelete({ _id: listId })
        if (!list) {
            return res.status(404).json({
                message: "List not found"
            })
        }
        return res.status(200).json({
            message: "List deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while deleting the list"
        })
    }
}

const updateList = async (req: Request, res: Response) => {
    const listId = req.params.id
    const userId = req.id
    console.log(listId, userId)
    const parsedData = taskListSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: parsedData.error.message
        })
    }
    const { listName } = parsedData.data
    try {
        const list = await List.findOneAndUpdate({ _id: listId, userId }, { listName }, { new: true })
        if (!list) {
            return res.status(404).json({
                message: "List not found"
            })
        }
        return res.status(200).json({
            message: "List updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while updating the list",
            error
        })
    }
}

const getAllList = async (req: Request, res: Response) => {
    const userId = req.id
    try {
        const userLists = await List.find({
            userId: userId
        })
        if (!userLists) {
            return res.status(404).json({
                message: "User has no lists"
            })
        }
        return res.status(200).json({
            message: "List fetched",
            lists: userLists
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while getting the list",
            error
        })
    }
}

const pinList = async (req: Request, res: Response) => {
    const listId = req.params.id
    const userId = req.id
    console.log(listId)
    try {
        const pinList = await PinnedList.findOneAndUpdate(
            {
                listId,
                userId
            },
            {
                listId,
                userId
            },
            {
                new: true,
                upsert: true
            }
        )
        if (!pinList) {
            return res.status(400).json({
                message: "Something went wrong while pinning list"
            })
        }
        return res.status(200).json({
            message: "List Pinned successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while pinnint list",
            error
        })
    }
}

const getPinnedLists = async (req: Request, res: Response) => {
    const userId = req.id
    try {
        const pinnedLists = await PinnedList.find({
            userId: userId
        })
        return res.status(200).json({
            message: "Pinned lists fetched",
            pinnedLists: pinnedLists
        })
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong while fetching pinned List",
            error
        })
    }
}

// Unpin Pinned Lists
const unPinList = async (req: Request, res: Response) => {
    const listId = req.params.id
    const userId = req.id
    try {
        const list = await PinnedList.findOneAndDelete({ listId: listId, userId: userId })

        if (!list) {
            return res.status(404).json({
                message: "List not found"
            })
        }
        return res.status(200).json({
            message: "List removed successfully",
            list
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while removing list",
            error
        })
    }
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
    unPinList,
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