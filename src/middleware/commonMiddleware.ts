import { NextFunction, Request, Response } from "express";

const middleware = (req: Request, res: Response, next: NextFunction)=>{
    try{
        next();
        
        if(!res.headersSent){
            const {data, message, statusCode } = res.locals.response || {};

            res.status(statusCode || 200).json({
                statusCode: statusCode || 200,
                message: message || "Success",
                data: data || {},
            });
        }
    }
catch (err: any){
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Eror",
    })

}
};

export default middleware;