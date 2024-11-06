import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        categoryName: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 500
        },
        description: {
            type: String
        },
        images: [String],
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        }]
    },
    {
        timestamps: true
    }
)


export const Note = mongoose.model("Note", noteSchema)
export const Category = mongoose.model("Category", categorySchema)