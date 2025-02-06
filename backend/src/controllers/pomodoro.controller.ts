import { Request, Response } from "express";


function pomodoro(req: Request, res: Response) {
    res.status(200).json({
        message: "Pomodoro Router"
    })
}

export {
    pomodoro
}