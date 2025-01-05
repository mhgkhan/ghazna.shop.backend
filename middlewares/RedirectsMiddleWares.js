export const RedirectDashboard = (req,res,next) =>{
    if(req.session.isLoggedIn){
        return res.redirect("/dashboard")
    }
    return next()
}