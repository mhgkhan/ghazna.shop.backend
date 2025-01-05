export const RedirectDashboard = (req, res, next) => {
    // get a speckifc cookie 
    const cookie = req.cookies["auth-token"];
    console.log('the cookie is ', cookie);
    
    if (cookie) {
        return res.redirect("/dashboard")
    }
    return next()
}