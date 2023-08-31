const { getUser } = require("../services/auth")

const redirectToLoggedinUserOnly = async (req, res, next) => {
    const userUid = await req.cookies?.uid;

    if (!userUid) return res.render("index");

    const user = getUser(userUid);

    if (!user) return res.render("index");

    req.user = user;
    next();
}

module.exports = {
    redirectToLoggedinUserOnly
}