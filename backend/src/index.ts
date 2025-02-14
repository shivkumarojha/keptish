import 'dotenv/config'
import express from "express"
import authRouter from './routes/auth.routes'
import calenderRouter from './routes/calender.routes'
import journalRouter from './routes/journal.routes'
import linkRouter from './routes/links.routes'
import notesRouter from './routes/notes.routes'
import pomodoroRouter from './routes/pomodoro.routes'
import tasksRouter from './routes/tasks.routes'

// Initializing express app
const app = express()

// Parsing body middleware
app.use(express.json())
// Health route
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Ok"
    })
})

// Routers
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/calender", calenderRouter)
app.use("/api/v1/journal", journalRouter)
app.use("/api/v1/links", linkRouter)
app.use("/api/v1/notes", notesRouter)
app.use("/api/v1/pomodoro", pomodoroRouter)
app.use("/api/v1/tasks", tasksRouter)
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