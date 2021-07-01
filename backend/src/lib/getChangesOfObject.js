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
