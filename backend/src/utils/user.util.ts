import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// Generate Jwt token
export const generateJwtToken = (id: string, email: string): string => {
    return jwt.sign(
        { id, email },
        process.env.JWT_SECRET_KEY as string,
        {
            expiresIn: "2d"
        })
}

// hash Password
export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10)
}


// Verify password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword)
}