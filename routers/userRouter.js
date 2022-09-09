import express from "express";
import { signup, login, protect } from "../Controllers/authController.js";
import { getAllUsers, UpdatePassword, getUser, updateUser, deleteUser, filterBody, forgotPassword, resetPassword, uploadProficPic, resizeUserPic } from "../Controllers/userController.js";
import { joiUserCreateValidator, joiUserUpdateValidator } from "../utils/joiValidators/userValidator.js";

const userRouter= express.Router()

userRouter.post('/signup', joiUserCreateValidator, signup)
userRouter.post('/login',login)

userRouter.patch('/updatePassword', protect, UpdatePassword)
userRouter.post('/forgotPassword', forgotPassword) 
userRouter.post('/resetPassword', resetPassword)

userRouter.get('/', getAllUsers)
userRouter.route('/:id')
.get(protect, getUser)
.patch(protect, joiUserUpdateValidator, uploadProficPic, resizeUserPic, filterBody, updateUser)
.delete(protect, deleteUser)

export default userRouter