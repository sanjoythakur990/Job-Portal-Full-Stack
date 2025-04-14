import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path";

dotenv.config({})

const app = express()

const _dirname = path.resolve()


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))


// apis
app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/application', applicationRoute)
// app.post('/api/v1/user', register)

app.use(express.static(path.join(_dirname, "/frontend/dist")))   // to serve the frontend
app.get('*', (_, res) => {   // * means it will serve other routes other than the above specified backend routes
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))  // here's how u serve the build file's index.html
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    connectDb()
    console.log(`Server is running on PORT ${PORT}`);
})