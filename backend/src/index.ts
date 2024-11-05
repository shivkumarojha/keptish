import express from "express"
const app = express()


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Yes here it is"
    })
})

app.get("/health", (req, res) => {
    res.send("Up and always up")
})
app.listen(3000, () => {
    console.log("Server is running at port ", 3000)
})