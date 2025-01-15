import 'dotenv/config'
import express from "express"


const app = express()

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Ok"
    })
})

app.listen(process.env.PORT)