

export const validation = (schema)=>{
    return (req,res,next)=>{
        let validation = schema.validate({...req.body, ...req.params}, {abortEarly: false});
        if(validation.error && validation.error.details) {
            return res.status(400).json({error: validation.error.details});
        }else {
            next();
        }
    }
}