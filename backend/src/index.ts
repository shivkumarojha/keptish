import 'dotenv/config'
import express from "express"


// Initializing express app
const app = express()


// Health route
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Ok"
    })
})


app.listen(process.env.PORT)
/* 
* Authentication and Signup
* CRUD Tasks
* CRUD Notes
* CRUD Journaling
* CRUD LINKS
* Calendar
* POMODORO like Flip clock
 */