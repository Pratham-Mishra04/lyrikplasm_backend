import mongoose from 'mongoose'
import envHandler from './envHandler.js'

const URL = envHandler("DATABASE_URL").replace('<password>', envHandler("DATABASE_PASSWORD"));

const connectToDB = () => mongoose.connect(URL)
                            .then(() =>console.log("Connected to Database!"))

export default connectToDB
