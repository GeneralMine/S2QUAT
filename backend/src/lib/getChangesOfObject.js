function getChangesOfObject(o, n) {
    let res = {};
    let keys = [...new Set(Object.keys(o).concat(Object.keys(n)))];

    console.log(keys);

    for (let key of keys) {
        if (o[key] === n[key])
            continue;

        res[key] = n[key];
    }

    return res;
}

let object = {
    name: "GERT",
    lastName: "Peter",
    birthday: "luuul",
    wegMitDerProperty: 1,
}

let data = {
    name: "Hans",
    lastName: "Peter",
    birthday: "gestern du arschloch",
}

console.log("changes are:", getChangesOfObject(object, data));