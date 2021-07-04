module.exports = async (req, res, next) => {
    if (req.user === undefined) {
        return res.status(401).send();
    }

    return next();
}