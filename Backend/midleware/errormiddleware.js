const errorHandler=(err,req,res,next)=>
{
    const statusCode= res.statusCode==200 ?500 : res.statusCode;
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==="production" ?null :err.stack,
    });

};
const notFound=(req,res,next)=>
{
    const error=new Error(`not found -${req.originalUrl}`)
    req.status(404);
    next(error);
}

module.exports={notFound,errorHandler};