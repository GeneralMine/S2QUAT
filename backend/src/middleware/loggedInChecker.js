module.exports = async (req, res, next) => {
    if (req.user === undefined) {
        console.log("Unauthorized user blocked trying to access data!");
        return res.status(401).send();
    }
    return next();
}