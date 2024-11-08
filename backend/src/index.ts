import "dotenv/config"
import express from "express"
import cors from "cors"
// Importing routers
import userRouter from "./routers/users.router"
import taskRouter from "./routers/tasks.router"
import notesRouter from "./routers/notes.router"
import calenderRouter from "./routers/calender.router"
import journalRouter from "./routers/journal.router"
import connectDb from "./db"
const app = express()

// allow cors
app.use(cors())

// parse body middleware
app.use(express.json())

// Health route
app.get("/health", (req, res) => {
    res.send("Up and always up")
})

// Routers
app.use("/api/v1/user/", userRouter)
app.use("/api/v1/notes/", notesRouter)
app.use("/api/v1/tasks/", taskRouter)
app.use("/api/v1/calender/", calenderRouter)
app.use("/api/v1/journal/", journalRouter)

// Connect database 
connectDb()

// Start the server
app.listen(process.env.PORT, () => {
    console.log("Server is running at port ", process.env.PORT)
})