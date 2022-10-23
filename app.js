import express from "express";
import morgan from "morgan"
import path from 'path'
import AppError from "./managers/AppError.js";
import { noURL } from "./controllers/errorController.js";
import connectToDB from './managers/DB.js'
import {uncaughtExceptionManager, unhandledRejectionManager} from './managers/baseErrorManager.js'
import userRouter from "./routers/userRouter.js";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import reviewRouter from './routers/reviewRouter.js'
import cors from 'cors'
import songRouter from "./routers/songRouter.js";

uncaughtExceptionManager

const __dirname=path.resolve()

const app=express()

app.use(express.json()) 
app.use(cors())

app.use(helmet())
app.use(ExpressMongoSanitize())

app.use(express.static(path.join(__dirname, 'public')))

if(process.env.NODE_ENV=='dev') app.use(morgan("dev"))

connectToDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`);
});

unhandledRejectionManager

app.use((req,res,next)=>{
    req.requestedAt=new Date().toISOString();
    next()
})

app.use("/users", userRouter)
app.use("/songRequest", songRouter)
app.use("/reviewRequet", reviewRouter)

app.all("*", (req, res, next)=>{
    next(new AppError(`Cannot find ${req.originalUrl}`, 404))
}) 

app.use(noURL)

export default app 