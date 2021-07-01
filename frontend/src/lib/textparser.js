export function capitalizeFirstLetter(string) {
    if (string === undefined) {
        return "undefined";
    }
    if (string === "") {
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseSingular(str) {
    if (str.endsWith("s")) {
        str = str.slice(0, -1);
    }
    if (str.endsWith("ie")) {
        str = str.slice(0, -2);
        str = str + "y";
    }
    return str;
}

export function parsePlural(str) {
    if (!str.endsWith("s") && !str.endsWith("y")) {
        str += "s";
    }
    if (str.endsWith("y")) {
        str = str.slice(0, -2);
        str += "ie";
    }
    return str;
}

export function lowerFirstLetter(string) {
    if (string === undefined) {
        return "undefined";
    }
    if (string === "") {
        return "";
    }
    return string.charAt(0).toLowerCase() + string.slice(1);
}