module.exports = async (req, res, next) => {
    if (req.user === undefined) {
        console.log("INTRUDER ALERT! FUCK OFF :)");
        return res.status(401).send();
    }

    return next();
}