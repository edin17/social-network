const token=req.token;

function verify(){
    if(!token) return res.status(400).send("Access denied!");

    const verify=jwt.verify(token,process.SECRET_TOKEN);
    
    if(!verify) return res.status(401).send("Access denied");
    next()
}

module.exports=verify;
