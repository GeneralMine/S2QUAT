module.exports = async (req, res, next) => {
    if (req.user === undefined) {
        return res.status(404).send();
    }

    return next();
}