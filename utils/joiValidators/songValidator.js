import Joi from 'joi'
import User from '../../models/userModel.js';
import catchAsync from '../../managers/catchAsync.js'

const joiSongCreateSchema = Joi.object({
    name:Joi.string().pattern(/^[A-Za-z]+$/, 'alpha').required(),
    // song:Joi.string().required(),
    submittedBy:Joi.string().required().custom(async (value, helper)=>{
        const user= await User.find({_id: value});
        if(!user) return helper.message("No User with this ID found.")
    }),
    submittedOn:Joi.forbidden(),
    description: Joi.string().max(50),
    // cover:Joi.string(),
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
    name:Joi.string().pattern(/^[A-Za-z]+$/, 'alpha'),
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

export const joiSongCreateValidator = catchAsync(async (req, res, next)=>{
    const value= await joiSongCreateSchema.validateAsync(req.body);
    next()
})

export const joiSongUpdateValidator = catchAsync(async (req, res, next)=>{
    const value= await joiSongUpdateSchema.validateAsync(req.body);
    next()
})