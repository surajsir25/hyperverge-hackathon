const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    // get token from header
    const token = req.header('x-auth-token');

    // check if not token
    if(!token){
        return res.status(401).json({ msg : 'no token, authorisation denied'});
    }

    //verify token
    try{
        const decoded = jwt.verify(token,config.get('secretkey'));
        console.log(decoded);
        req.user = decoded.learner;
    
        next();
    }catch (err){
        res.status(401).json({msg:'token is not valid'});
    }
}