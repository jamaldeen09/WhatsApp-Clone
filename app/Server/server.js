import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from 'path'
import { fileURLToPath } from 'url'
import cors from "cors"
import authRouter from "./Routes/authRouters.js"
import cookieParser from "cookie-parser"
import http from "http"
import { Server } from "socket.io"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ 
    path: path.join(__dirname, '.env') 
})
const URL = process.env.MONGO_URL
const app = express();
const PORT = process.env.PORT || 4090
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})


app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())
app.use("/api", authRouter)

io.on("connection", (socket) => {
    console.log("Connection Successfull")
})


mongoose.connect(URL).then(async () => {
   console.log("Successfully connected to mongoDb");
   server.listen(PORT, () => console.log(`Port ${PORT} is being listened to..`))
}).catch((error) => console.error(error))






