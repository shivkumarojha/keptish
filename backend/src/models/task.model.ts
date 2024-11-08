import mongoose, { mongo } from "mongoose";

const listSchema = new mongoose.Schema(
    {
        listName: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)
const pinnedListSchema = new mongoose.Schema({
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 500
        },
        description: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List',
        }
    },

    {
        timestamps: true
    }
)


export const List = mongoose.model('List', listSchema)
export const Task = mongoose.model('Task', taskSchema)
export const PinnedList = mongoose.model('PinnedList', pinnedListSchema)