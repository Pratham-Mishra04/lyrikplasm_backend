import Song from "../models/songModel.js";
import AppError from "../managers/AppError.js";
import catchAsync from "../managers/catchAsync.js";
import { getAllDocs, getDoc, updateDoc, deleteDoc, createDoc, getAllDocsByUser } from "../utils/HandlerFactory.js";
import sendEmail from "../utils/Email.js";
import resizePic from "../utils/resizePic.js";
import uploadPic from "../utils/uploadPic.js";

export const checkSong = id =>catchAsync(async(req, res, next)=>{
    const song= await Song.findById(id);
    if(!song) return next(new AppError("No Song Request of this ID found."));
    req.song= song;
})

export const setDueAmount = catchAsync(async(req, res, next)=>{
    const data = req.body;
    // if(data.submissionType=='cat1'){
    //     if(data.videoRequested.videoType=='regular')
    //     else if(data.videoRequested.videoType=='audio spectrum')
    //     else if(data.videoRequested.videoType=='something different')
    // }
    // else if(data.submissionType=='cat2'){
    //     if(data.videoRequested.videoType=='regular')
    //     else if(data.videoRequested.videoType=='audio spectrum')
    //     else if(data.videoRequested.videoType=='something different')
    // }
    // else if(data.submissionType=='cat3'){
    //     if(data.videoRequested.videoType=='regular')
    //     else if(data.videoRequested.videoType=='audio spectrum')
    //     else if(data.videoRequested.videoType=='something different')
    // }
})

export const getAllSongs=getAllDocsByUser(Song);

export const getSong= getDoc(Song);

export const postSong = createDoc(Song)

export const updateSong = updateDoc(Song);

export const deleteSong = deleteDoc(Song);

export const requestAccepted = catchAsync(async(req, res, next)=>{
    const song= req.song;
    song.isAccepted=true;
    song.save();

    //send mail for accepted.

    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:song
    })
})

export const requestRejected = catchAsync(async(req, res, next)=>{
    const song= req.song;
    song.isClosed=true;
    song.remarks="Rejected"
    song.save();

    //send mail for rejected.

    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:song
    })
})

export const markUploaded = catchAsync(async(req, res, next)=>{
    const song= req.song;
    song.videoRequested.isUploaded=true;
    song.videoRequested.uploadedAt=Date.now();
    song.remarks="Payment Due"
    song.payment.nextMail=new Date(Date.now() + 12*60*60*1000);
    song.save();

    //send mail for uploaded.

    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:song
    })
})

export const markPaid = catchAsync(async (req, res, next)=>{
    const song=req.song;
    song.payment.isComplete=true;
    song.payment.dueAmount=0;
    song.isClosed=true;
    song.remarks="Closed"
    song.save();

    //send mail for payment done.

    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:null
    })
})

