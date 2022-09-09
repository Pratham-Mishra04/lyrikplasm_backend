import mongoose from "mongoose";

emails=[];

const songSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    song:{
        type:String
    },
    submittedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    submittedOn:{
        type:Date,
        default:Date.now()
    },
    description:String,
    cover:String,
    isAccepted:{
        type:Boolean,
        default:false
    },
    isClosed:{
        type:Boolean,
        default:false
    },
    remarks:String,
    songType:{
        type:String,
        enum:{
            values:['orginal','cover','remix','mashup']
        }
    },
    submissionType:{
        type:String,
        enum:{
            values:['cat1','cat2','cat3']
        }
    },
    videoRequested:{
        isUploaded:{
            type:Boolean,
            default:false
        },
        uploadedAt:Date,
        videoType:{
            type:String,
            enum:{
                values:['regular','audio spectrum','something different']
            }
        }
    },
    advancePaid:Boolean,
    payment:{
        emailStack:[String],
        nextMail:Date,
        isComplete:{
            type:Boolean,
            default:false
        },
        dueAmount:Number
    }
},{
    toJSON : {virtuals:true},
    toObject : {virtuals:true} 
})

const Song = mongoose.model("Song", songSchema);

export default Song;