import 'dotenv/config'
import express from "express"
import authRouter from './routes/auth.routes'
// Initializing express app
const app = express()

// Health route
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Ok"
    })
})
app.use("/auth", authRouter)
app.listen(process.env.PORT, () => {
    console.log("Server is runnig at port", process.env.PORT)
})

/* Authentication and Signup
* CRUD Tasks
* CRUD Notes
* CRUD Journaling
* CRUD LINKS
* Calendar
* POMODORO like Flip clock
 */