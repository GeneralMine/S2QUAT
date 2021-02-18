const controller = require("../../controller/users");

module.exports = async (req, res) => {
    res.clearCookie("token");
    if (req.user === undefined) {
        console.error("LOGOUT: req.user is null!");
        console.log(req.user);
        return res.status(401).send();
    }

    await controller.generateNewSession(req.user.id);
    console.log("LOGOUT: User " + req.user.name + " logged out successfully!");
    await res.clearCookie("token");
    return res.status(200).send();
}
