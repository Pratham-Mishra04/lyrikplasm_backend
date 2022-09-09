import catchAsync from "../managers/catchAsync.js";

export const setDueAmount = catchAsync(async(req, res, next)=>{
    req.body.payment={
        "dueAmount":null
    }
    if(req.body.submissionType=='cat1'){
        if(req.body.videoRequested.videoType=='regular') req.body.payment.dueAmount=25*0.75;
        else if(req.body.videoRequested.videoType=='audio spectrum') req.body.payment.dueAmount=15*0.75;
        else if(req.body.videoRequested.videoType=='something different') req.body.payment.dueAmount=79*0.75;
    }
    else if(req.body.submissionType=='cat2'){
        if(req.body.videoRequested.videoType=='regular') req.body.payment.dueAmount=15*0.75;
        else if(req.body.videoRequested.videoType=='audio spectrum') req.body.payment.dueAmount=10*0.75;
        else if(req.body.videoRequested.videoType=='something different') req.body.payment.dueAmount=59*0.75;
    }
    else if(req.body.submissionType=='cat3'){
        if(req.body.videoRequested.videoType=='regular') req.body.payment.dueAmount=5*0.75;
        else if(req.body.videoRequested.videoType=='audio spectrum') req.body.payment.dueAmount=0*0.75;
        else if(req.body.videoRequested.videoType=='something different') req.body.payment.dueAmount=39*0.75;
    }
    next()
})

export const discounts = catchAsync(async(req, res, next)=>{
    if (req.user.numSongs>3){
        if(req.body.submissionType=='cat1') req.body.payment.dueAmount*=0.85;
        else if(req.body.submissionType=='cat2') req.body.payment.dueAmount*=0.90;
    }
    next()
})