export const RedirectDashboard = (req, res, next) => {
    // get a speckifc cookie 
    const cookie = req.cookies["auth-token"];

    if (cookie) {
        return res.redirect("/dashboard")
    }
    return next()
}