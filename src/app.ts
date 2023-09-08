import "dotenv/config"

import express from "express"
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"

import { authRouter, todoRouter, userRouter } from "./routes"

// app initialization
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 4000

// adding middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(morgan("tiny"))
app.use(compression())

app.use(express.static("./public"))
app.set("view engine", "hbs")
app.set("views", "template")

// demo route
app.get("/hello", async (req, res) => {
  res.status(200).json({
    status: true,
    route: req.url,
    message: "hurray!",
  })
})

app.get("/greet", (req, res) => {
  res.status(200).render("index", {
    data: {
      name: "Saurabh Chaudhary",
      route: req.url,
      origin: "India",
      gender: "male",
    },
  })
})

// routers group
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/todo", todoRouter)

// starting server
server.listen(Number(port), () => {
  console.log(`application is listening at http://127.0.0.1:${port}`)
})
