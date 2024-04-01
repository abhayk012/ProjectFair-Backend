const appMiddleware=(req,res,next)=>{
    console.log("inside appmiddleware");
    next();
}
module.exports=appMiddleware