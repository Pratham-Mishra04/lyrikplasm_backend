import Joi from 'joi'
import User from '../../models/userModel.js';
import catchAsync from '../../managers/catchAsync.js'
import fs from 'fs'

const joiSongCreateSchema = Joi.object({
    songName:Joi.string().pattern(/^[A-Za-z]+$/, 'alpha').required(),
    // song:Joi.string().required(),
    submittedBy:Joi.string().required().custom(async (value, helper)=>{
        const user= await User.find({_id: value});
        if(!user) return helper.message("No User with this ID found.")
    }),
    song:Joi.string().required(),
    songCover:Joi.string().required(),
    submittedOn:Joi.forbidden(),
    description: Joi.string().max(50),
    // songCover:Joi.string(),
    isAccepted:Joi.forbidden(),
    isClosed:Joi.forbidden(),
    remarks:Joi.forbidden(),
    songType:Joi.string().required(),
    submissionType:Joi.string().required(),
    videoRequested:Joi.object({
        isUploaded:Joi.forbidden(),
        uploadedAt:Joi.forbidden(),
        videoType:Joi.string().required()
    }),
    advancePaid:Joi.bool().required(),
    payment:Joi.forbidden()
})

const joiSongUpdateSchema =Joi.object({
    songName:Joi.string().pattern(/^[A-Za-z]+$/, 'alpha'),
    // song:Joi.forbidden(),
    submittedBy:Joi.forbidden(),
    submittedOn:Joi.forbidden(),
    description: Joi.string().max(50),
    // cover:Joi.string(),
    isAccepted:Joi.forbidden(),
    isClosed:Joi.forbidden(),
    remarks:Joi.forbidden(),
    songType:Joi.string(),
    submissionType:Joi.forbidden(),
    videoRequested:Joi.forbidden(),
    advancePaid:Joi.forbidden(),
    payment:Joi.forbidden()
})

export const joiSongCreateValidator = (async (req, res, next)=>{
    if(req.body.videoRequested) req.body.videoRequested=JSON.parse(req.body.videoRequested)
    req.postingUser= await User.findById(req.body.submittedBy).populate({
        path:"songs",
        select:"songName"
    })

    await joiSongCreateSchema.validateAsync(req.body).catch(error=>{
        if(req.files['songCover'])
        fs.unlinkSync(req.files['songCover'][0].destination+'/'+req.files['songCover'][0].filename, function(err){
            return next(err)
        })
        if(req.files['song'])
        fs.unlinkSync(req.files['song'][0].destination+'/'+req.files['song'][0].filename, function(err){
            return next(err)
        })
        return next(error)
    })
    next()
})

export const joiSongUpdateValidator = catchAsync(async (req, res, next)=>{
    const value= await joiSongUpdateSchema.validateAsync(req.body);
    next()
})