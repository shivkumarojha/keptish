import { Request, Response } from "express";
import { taskListSchema, taskSchema } from "../validators/task.validator";
import { List, PinnedList, Task } from "../models/task.model";

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
const addTask = async (req: Request, res: Response) => {
    const parsedData = taskSchema.safeParse(req.body)
    const userId = req.id
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid data",
            error: parsedData.error
        })
    }
    const { title, description } = parsedData.data
    try {
        const task = await Task.create({
            title,
            description,
            userId
        })
        return res.status(201).json({
            message: "Task added successfully",
            task
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while adding task",
            error
        })
    }
}

const deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.id
    const userId = req.id
    try {
        const task = await Task.findOneAndDelete({ _id: taskId, userId: userId })
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        return res.status(200).json({
            message: "Task deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while deleting task",
            error
        })
    }
}

const updateTask = async (req: Request, res: Response) => {
    const taskId = req.params.id
    const userId = req.id
    const parsedData = taskSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid data",
            error: parsedData.error
        })
    }
    const { title, description } = parsedData.data
    try {
        const task = await Task.findOneAndUpdate({ _id: taskId, userId: userId }, { title, description }, { new: true, upsert: true })
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        return res.status(200).json({
            message: "Task updated successfully",
            task
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while updating task",
            error
        })
    }
}

const getAllTask = async (req: Request, res: Response) => {

    try {
        const tasks = await Task.find({ userId: req.id })
        return res.status(200).json({
            message: "All tasks fetched successfully",
            tasks
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while fetching all tasks",
            error
        })
    }
}

const addTaskToList = async (req: Request, res: Response) => {
    const taskId = req.params.taskId
    const listId = req.params.listId
    const userId = req.id
    try {
        const task = await Task.findOneAndUpdate({ _id: taskId, userId: userId }, { listId }, { new: true, upsert: true })
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        return res.status(200).json({
            message: "Task added successfully",
            task
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while adding task",
            error
        })
    }
}
const getTaskByList = async (req: Request, res: Response) => {
    const listId = req.params.id
    const userId = req.id
    try {
        const tasks = await Task.find({ userId: userId, listId: listId })
        return res.status(200).json({
            message: "All tasks fetched successfully",
            tasks
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while fetching all tasks",
            error
        })
    }
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
    addTaskToList,
    getTaskByList,
    getPaginatedTasks
}