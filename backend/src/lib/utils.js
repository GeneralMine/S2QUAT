module.exports = {
    forExternal({ id, email, name, last_logout, status, role, }) {
        return {
            id,
            email,
            name,
            last_logout,
            status,
            role,
        }
    },
    sleep(milliseconds) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            },
                milliseconds);
        })
    },

    // From https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    capitalizeFirstLetter(string) {
        if (string === undefined) {
            return "undefined";
        }
        if (string === "") {
            return "";
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getMethods(obj) {
        var res = [];
        for (var key in obj) {
            if (typeof obj[key] === "function") {
                res.push(key)
            }
        }
        return res;
    }
}

