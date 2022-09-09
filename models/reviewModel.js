import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    songName:{
        type:String,
        trim:true
    },
    song:{
        type:String
    },
    description:{
        type:String,
        maxlength:50
    },
    songType:{
        type:String,
        enum:{
            values:['orginal','cover','remix','mashup']
        }
    },
    cover:String,
    requestedAt:{
        type:Date,
        default:Date.now()
    },
    isAnswered:Boolean,
    isClosed:Boolean
})

const Review = mongoose.model("Review", reviewSchema);

export default Review;