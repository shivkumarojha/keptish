import 'dotenv/config'
import express from "express"
import authRouter from './routes/auth.routes'
import calenderRouter from './routes/calender.routes'
import journalRouter from './routes/journal.routes'

// Initializing express app
const app = express()

// Health route
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Ok"
    })
})

// Routers
app.use("/auth", authRouter)
app.use("/calender", calenderRouter)
app.use("/journal", journalRouter)

// Initiate the server
app.listen(process.env.PORT, () => {
    console.log("Server is running at port", process.env.PORT)
})

/* Authentication and Signup
* CRUD Tasks
* CRUD Notes
* CRUD Journaling
* CRUD LINKS
* Calendar
* POMODORO like Flip clock
 */