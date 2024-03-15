const jwt = require('jsonwebtoken');
const JWT_SECRET = 'dallabadmaashbada';

const fetchUser = (req,res,next) => {
    //Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).json({error:"Please authenticate using a valid token"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        }

    catch(e) {
        return res.status(401).json({error:"Please authenticate using a valid token"});
    }    
}

module.exports = fetchUser;