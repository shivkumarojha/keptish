import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
    {
        listName: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 500
        },
        description: String,
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List'
        }
    },

    {
        timestamps: true
    }
)

export const List = mongoose.model('List', listSchema)
export const Task = mongoose.model('Task', taskSchema)