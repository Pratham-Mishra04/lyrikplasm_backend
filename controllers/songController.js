import Song from "../models/songModel.js";
import AppError from "../managers/AppError.js";
import catchAsync from "../managers/catchAsync.js";
import { getAllDocs, getDoc, updateDoc, deleteDoc, createDoc, getAllDocsByUser } from "../utils/HandlerFactory.js";
import sendEmail from "../utils/Email.js";
import resizePic from "../utils/resizePic.js";
import uploadPic from "../utils/uploadPic.js";
import multer from "multer";
import sharp from "sharp";
import audioEncoder from 'audio-encoder';
import fileSaver from 'file-saver'
import fs from 'fs'

export const checkSong =(async(req, res, next)=>{
    const song= await Song.findById(req.params.id);
    if(!song) return next(new AppError("No Song Request of this ID found."));
    req.song= song;
    next()
})

export const getAllSongs=getAllDocsByUser(Song);

export const getSong= getDoc(Song);

export const postSong = createDoc(Song)

export const updateSong = updateDoc(Song);

export const deleteSong = deleteDoc(Song);

export const resizeCover = (req, res, next)=>{

    if(!req.files) return next()

    const promise = fs.promises.readFile(req.files['songCover'][0].destination+'/'+req.files['songCover'][0].filename);

    Promise.resolve(promise).then(function(buffer){
        sharp(buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({quality: 100})
    .toFile(`public/songRequests/songCovers/${req.body.songName}-${req.user.name}-${Date.now()}.jpeg`)

    });

    fs.unlinkSync(req.files['songCover'][0].destination+'/'+req.files['songCover'][0].filename, function(err){
        next(err)
    })

    req.body.songCover = `${req.body.songName}-${req.user.name}-${Date.now()}.jpeg`;
    
    next()
}

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
    if(!song.isAccepted) return next(new AppError("Song is not accepted yet.", 400))
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
    if(!song.isAccepted) return next(new AppError("Song is not accepted yet.", 400))
    else if(!song.videoRequested.isUploaded) return next(new AppError("Video is not uploaded yet.", 400))
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

