import { Request, Response} from "express"

function calender (req:Request, res: Response) {
    res.status(200).json({
        message:"calender route"
    })
}

export {
    calender
}