import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        }
    },
    {
        timestamps: true
    }

)

userSchema.index({ email: 1 })

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        profileImage: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
export const User = mongoose.model("User", userSchema)
export const Profile = mongoose.model("Profile", profileSchema)