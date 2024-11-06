import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { z } from "zod"
import { User } from "../models/user.model"
import jwt from 'jsonwebtoken'
// zod User schema
const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
})

// signup user schema
const signupUserSchema = userSchema.pick({ email: true, password: true })

const signin = async (req: Request, res: Response) => {
    const parsedData = signupUserSchema.safeParse(req.body)

    // validate user 
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Invalid inputs"
        })
    }

    const { email, password } = parsedData.data

    // check if the user exist 
    const user = await User.findOne({
        email: email
    }).select('email password')

    if (!user) {
        return res.status(404).json({
            message: "Email id doesn't exist, kindly sign up"
        })
    }

    // Check password
    const matched = await bcrypt.compare(password, user.password)
    if (!matched) {
        return res.status(401).json({
            message: "Unauthorized, password didn't matched"
        })
    }

    const jwtPayload = {
        email: user.email
    }
    // return jwt token
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string)

    return res.status(200).json({
        message: "Logged in success.",
        token: token
    })
}

const signup = async (req: Request, res: Response) => {
    const parsedData = userSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(404).json({
            message: "invalid inputs",
            error: parsedData.error
        })
    }

    const { email, name, password, confirmPassword } = parsedData.data
    if (password != confirmPassword) {
        return res.status(404).json({
            message: "Password and Confirm Password doesn't matched"
        })
    }

    // check if the user exist 
    const userExist = await User.findOne({
        email: email
    })
    if (userExist) {
        return res.status(409).json({
            message: "User with this email already exist, Please Login."
        })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // save the user in the db
    const user = await User.create({
        email,
        password: hashedPassword,
        name: name,
    })

    console.log(user)

    if (!user) {
        return res.status(404).json({
            message: "something went wrong while creating the user"
        })
    }
    return res.status(201).json({
        message: "Signed up succesfully, Kindly Login. Thank you."
    })
}

// schema for password change
const changePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmNewPassword: z.string(),
})
const changePassword = async (req: Request, res: Response) => {
    const parsedData = changePasswordSchema.safeParse(req.body)
    const email = req.email
    console.log(email)
    if (!parsedData.success) {
        return res.status(404).json({
            message: "Inputs are invalid",
            error: parsedData.error
        })
    }

    const { oldPassword, newPassword, confirmNewPassword } = parsedData.data
    // check the provided password and confirm password mathes
    if (newPassword != confirmNewPassword) {
        return res.status(404).json({
            message: "New password doesn't matched with each other"
        })
    }

    // get the real password
    const user = await User.findOne({
        email: req.email
    }).select('password')
    if (!user) {
        return res.status(404).json({
            message: "user doesn't exist"
        })
    }
    const matched = await bcrypt.compare(oldPassword, user.password)
    if (!matched) {
        return res.status(401).json({
            message: "Unauthorized, Old Password didn't match"
        })
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // update the password
    const updateUser = await User.findOneAndUpdate(
        {
            email: email,
        },
        {
            password: hashedPassword
        }
    )
    return res.status(201).json({
        message: "Password updated."
    })

}


export {
    signin,
    signup,
    changePassword
}