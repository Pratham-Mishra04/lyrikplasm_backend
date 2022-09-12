import Review from "../models/reviewModel.js";
import AppError from "../managers/AppError.js";
import catchAsync from "../managers/catchAsync.js";
import { getAllDocs, getDoc, updateDoc, deleteDoc, createDoc, getAllDocsByUser } from "../utils/HandlerFactory.js";
import sendEmail from "../utils/Email.js";
import resizePic from "../utils/resizePic.js";
import uploadPic from "../utils/uploadPic.js";
import fs from 'fs'
import sharp from 'sharp'

export const checkReview = id =>catchAsync(async(req, res, next)=>{
    const review= await Review.findById(id);
    if(!review) return next(new AppError("No Review Request of this ID found."));
    req.review= review;
})

export const getAllReviews=getAllDocsByUser(Review);

export const getReview= getDoc(Review);

export const postReview = createDoc(Review)

export const updateReview = updateDoc(Review);

export const deleteReview = deleteDoc(Review);

export const markAnswered = catchAsync(async (req, res, next)=>{
    const review=req.review;
    review.isAnswered=true;
    review.save();

    //send mail for review answered.

    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:null
    })
})

export const markClosed = catchAsync(async (req, res, next)=>{
    const review=req.review;
    review.isClosed=true;
    review.save();

    //send mail for review done.

    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:null
    })
})

export const resizeCover = (req, res, next)=>{

    if(!req.files) return next()

    const promise = fs.promises.readFile(req.files['songCover'][0].destination+'/'+req.files['songCover'][0].filename);

    Promise.resolve(promise).then(function(buffer){
        sharp(buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({quality: 100})
    .toFile(`public/reviewRequests/songCovers/${req.body.songName}-${req.user.name}-${Date.now()}.jpeg`)

    });

    fs.unlinkSync(req.files['songCover'][0].destination+'/'+req.files['songCover'][0].filename, function(err){
        next(err)
    })

    req.body.songCover = `${req.body.name}-${req.user.name}-${Date.now()}.jpeg`;
    
    next()
}
