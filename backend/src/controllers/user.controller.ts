import { Request, Response } from "express"
import { User } from "../models/user.model"
import { changePasswordSchema, signupUserSchema, userSchema } from "../validators/user.validator"
import { generateJwtToken, hashPassword, verifyPassword } from "../utils/user.util"


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
    const matched = await verifyPassword(password, user.password)
    if (!matched) {
        return res.status(401).json({
            message: "Unauthorized, password didn't matched"
        })
    }

    // return jwt token
    const token = generateJwtToken(email)

    return res.status(200).json({
        message: "Logged in success.",
        token: token
    })
}

const signup = async (req: Request, res: Response) => {
    const parsedData = userSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
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
    const hashedPassword = await hashPassword(password)

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
        return res.status(422).json({
            message: "New password and Confirm  password doesn't matched"
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
    const matched = await verifyPassword(oldPassword, user.password)
    if (!matched) {
        return res.status(401).json({
            message: "Unauthorized, Old Password didn't match"
        })
    }
    // hash the password
    const hashedPassword = await hashPassword(newPassword)

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