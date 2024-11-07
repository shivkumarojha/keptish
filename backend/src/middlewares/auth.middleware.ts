import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const token = authHeader.split(" ")[1]
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string, email: string }

        req.email = verify.email
        req.id = verify.id
        next()

    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
}

export default authMiddleware