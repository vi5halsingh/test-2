const jwt = require('jsonwebtoken');
const userModel = require('../models/User.Model');
const authMiddleware = async(req, res, next) => {
  
    const token =await req.cookies?.token;
    console.log(token)
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ msg: 'Invalid token' });
        }
        req.user = user;
        next();
    }catch(e){
        console.log(e)
        res.status(400).json({ msg: 'Invalid token' })
    }
}

module.exports = {authMiddleware};