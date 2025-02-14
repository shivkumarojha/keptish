import { Request, Response } from "express"
import { z } from "zod"
import prisma from "../db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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

        // TODO: send verification email
        return res.status(201).json({
            message: "Sign up successfull, Please verify your email.Check your email"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Some error occured while adding user!",
            error
        })
    }

}

const SignInSchema = UserSignupSchema.omit({ name: true })
// Signin Controller
async function singin(req: Request, res: Response) {
    const parsedData = SignInSchema.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            error: parsedData.error
        })
    }

    const { email, password } = parsedData.data
    // checking if the user exist in db
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                password: true,
                id: true,
                isEmailVerified: true
            }
        })
        if (!user) {
            return res.status(400).json({
                message: "User Doesn't Exist!"
            })
        }
        if (!user.isEmailVerified) {
            return res.status(401).json({
                message: "Email not verified, please verify. Check your email"
            })
        }

        // compare hashed password
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Password doesn't match!"
            })
        }

        // return jwt token if password matched
        const token = jwt.sign(
            {
                email,
                id: user.id
            },
            process.env.JWT_SECRET as string
        )

        return res.status(200).json({
            message: "Log in Successfull",
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        })
    }

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