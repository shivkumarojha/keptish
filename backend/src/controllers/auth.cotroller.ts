import { Request, Response } from "express"

function singin(req: Request, res: Response) {
    res.status(200).json({
        message: "Signin route"
    })
}

export {
    singin
} 