import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace('Bearer ', '');

    if(token){
        try{
            const decoded = jwt.verify(token, 'secretKeyNode');

            req.userId = decoded._id;

            next();
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err
            })
        }
    }else{
        return res.status(403).json({
            success: false,
            message: 'Token is not valid!'
        })
    }
}