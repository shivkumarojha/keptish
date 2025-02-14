import { Request, Response } from "express"
import { z } from "zod"
import prisma from "../db"
import bcrypt from "bcrypt"

const UserSignupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be more than 6 letters.")
})

// Signup Controller
async function signup(req: Request, res: Response) {
    const parsedData = UserSignupSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect signup inputs",
            error: parsedData.error
        })
    }

    // Check if the user exist

    try {
        const user = await prisma.user.findUnique({
            where: { email: parsedData.data.email }
        })

        if (user) {
            return res.status(409).json({
                message: "User already exists!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something happend while retriving user information",
            error
        })
    }

    // Hashing the password 
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10)

    // Saving the data in database
    try {
        const user = await prisma.user.create({
            data: {
                name: parsedData.data.name,
                email: parsedData.data.email,
                password: hashedPassword
            }
        })
        return res.status(201).json({
            message: "User created"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Some error occured while adding user!",
            error
        })
    }

}

// Signin Controller
function singin(req: Request, res: Response) {
    res.status(200).json({
        message: "Signin route"
    })
}
// forget password controller
function changePassword(req: Request, res: Response) {
    res.status(200).json({
        message: "Password changed"
    })
}


export {
    singin,
    signup,
    changePassword
} 