import { Request, Response } from "express";

function journal(req: Request, res: Response) {
    res.status(200).json({
        message: "Journal Router"
    })
}

export {
    journal
}