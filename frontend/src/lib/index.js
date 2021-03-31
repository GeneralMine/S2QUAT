import { is_loading } from "../components/still_loading";

// IST THREAD BLOCKING! AUFPASSEN
export function sleep(ms) {
    return new Promise(res => {
        setTimeout(() => res(), ms);
    })
}

export async function postData(url = '', data = {}) {
    // Default options are marked with *

    is_loading.set(true);

    let response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    is_loading.set(false);

    return response;
}

export async function getData(url = '') {
    // Default options are marked with *
    is_loading.set(true);

    let response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    is_loading.set(false);

    return response;
}

export async function deleteData(url = '') {
    // Default options are marked with *
    is_loading.set(true);

    let response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    is_loading.set(false);

    return response;
}

// From https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
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

export function lowerFirstLetter(string) {
    if (string === undefined) {
        return "undefined";
    }
    if (string === "") {
        return "";
    }
    return string.charAt(0).toLowerCase() + string.slice(1);
}