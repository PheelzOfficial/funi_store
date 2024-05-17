const jwt = require("jsonwebtoken")

const verify = async(req, res, next)=>{
    const token = req.cookies.funi_store
    if(!token){
        next();
    }else{
        const decoded = await jwt.verify(token, "Godisgood")
        req.user = decoded
        next();
    }
}


module.exports = {verify}