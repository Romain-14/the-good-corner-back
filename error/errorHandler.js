export const errorHandler = (err, req, res, next)=>{
    if(err.code === "ER_NO_SUCH_TABLE"){
        res.status(500).json({ 
            status: 500,
            msg: err.message,
        });
    } else {
        console.log("erreur pas encore intégré it's coming soon by blizzard", err)
    }
}