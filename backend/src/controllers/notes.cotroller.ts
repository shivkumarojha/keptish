import { Request, Response } from "express";

function notes(req: Request, res: Response) {
    res.status(200).json({
        message: "Notes router"
    })
}

export {
    notes
}