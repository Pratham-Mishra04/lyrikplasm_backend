import Joi from 'joi'
import User from '../../models/userModel.js';
import catchAsync from '../../managers/catchAsync.js'
import fs from 'fs'

const joiReviewCreateSchema = Joi.object({
    songName:Joi.string().required(),
    song:Joi.string().required(),
    user:Joi.string().required().custom(async (value, helper)=>{
        const user= await User.find({_id: value});
        if(!user) return helper.message("No User with this ID found.")
    }),
    requestedAt:Joi.forbidden(),
    description: Joi.string().max(50),
    songCover:Joi.string().required(),
    isAnswered:Joi.forbidden(),
    isClosed:Joi.forbidden(),
    remarks:Joi.forbidden(),
    songType:Joi.string().required()
})

export const joiReviewCreateValidator = catchAsync(async (req, res, next)=>{
    req.postingUser= await User.findById(req.body.submittedBy).populate({
        path:"songs",
        select:"name"
    })
    await joiReviewCreateSchema.validateAsync(req.body).catch(error=>{
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