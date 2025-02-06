import { Request, Response } from "express";

function links(req: Request, res: Response) {
    res.status(200).json({
        message: "Links Router"
    })
}

export {
    links
}