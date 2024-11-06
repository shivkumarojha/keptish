import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"


// export interface AuthenticatedRequest extends Request {
//     email: string
// }

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const token = authHeader.split(" ")[1]
    console.log(token)
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { email: string }
        console.log(verify)

        req.email = verify.email
        next()

    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
}

export default authMiddleware