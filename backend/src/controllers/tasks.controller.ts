import { Request, Response } from "express";

function tasks(req: Request, res: Response) {
    res.status(200).json({
        message: "Tasks router"
    })
}

export {
    tasks
}
