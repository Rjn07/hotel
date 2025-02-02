const jwt = require('jsonwebtoken');

const jwtAuthMiddleware =(req ,res ,next)=>{
    const token = req.header.authorization.split( ' ')[1];
    if(!token) return res.status(401).json({error : 'Token is not found'});


    try {

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });

    }
}

// function to generate token

const generateToken =(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn: 30000})
}

module.exports= {jwtAuthMiddleware,generateToken}