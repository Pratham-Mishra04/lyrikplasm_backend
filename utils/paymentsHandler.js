import catchAsync from "../managers/catchAsync.js";
import User from "../models/userModel.js";

const getAmount = (submissionType, videoType) =>{

    const priceMatrix=[[25,15,79],[15,10,59],[5,0,39]];

    var x,y;
    if(submissionType=='cat1') x=0;
    else if(submissionType=='cat2') x=1;
    else if(submissionType=='cat3') x=2;
    if(videoType=='regular') y=0;
    else if(videoType=='audio spectrum') y=1;
    else if(videoType=='something different') y=2;

    return priceMatrix[x][y];
}

export const setDueAmount = catchAsync(async(req, res, next)=>{
    req.body.payment={
        "dueAmount":null
    }
    req.body.payment.dueAmount=getAmount(req.body.submissionType, req.body.videoRequested.videoType)*0.75;
    next()
})

export const discounts = catchAsync(async(req, res, next)=>{
    console.log("here at discounts")
    if (req.postingUser.numSongs>2){ // cause at the time of posting 4th song, the current value of numSongs would be 3
        if(req.body.submissionType=='cat1') req.body.payment.dueAmount*=0.85;
        else if(req.body.submissionType=='cat2') req.body.payment.dueAmount*=0.90;
    }
    next()
})