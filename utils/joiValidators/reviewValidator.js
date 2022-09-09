import Joi from 'joi'
import User from '../../models/userModel.js';
import catchAsync from '../../managers/catchAsync.js'

const joiReviewCreateSchema = Joi.object({
    songName:Joi.string().required(),
    // song:Joi.string().required(),
    user:Joi.string().required().custom(async (value, helper)=>{
        const user= await User.find({_id: value});
        if(!user) return helper.message("No User with this ID found.")
    }),
    requestedAt:Joi.forbidden(),
    description: Joi.string().max(50),
    // cover:Joi.string(),
    isAnswered:Joi.forbidden(),
    isClosed:Joi.forbidden(),
    remarks:Joi.forbidden(),
    songType:Joi.string().required()
})

export const joiReviewCreateValidator = catchAsync(async (req, res, next)=>{
    const value= await joiReviewCreateSchema.validateAsync(req.body);
    next()
})