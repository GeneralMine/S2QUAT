module.exports = {
    remodel(obj) {
        const r = {};
        obj.forEach((el) => {
            let parentID;
            if (el.parent === undefined) {
                parentID = el.parentId;
            }
            else {
                parentID = el.parent == null ? null : el.parent.id;
            }
            if (r[parentID] === undefined) {
                r[parentID] = [];
            }
            r[parentID].push(el);
        });
        return r;
    },
    createNode(node, map) {
        return new Proxy(node, {
            get: (target, propertyName, receiver) => {
                if (propertyName !== "children") {
                    return Reflect.get(target, propertyName, receiver);
                }
                if (
                    map[target.id] === undefined ||
                    map[target.id].length === 0
                ) {
                    return [];
                }
                return map[target.id].map((el) => this.createNode(el, map));
            },
        });
    }
}