module.exports = {
    groupBy(items, key) {
        return items.reduce(
            (result, item) => ({
                ...result,
                [item[key]]: [
                    ...(result[item[key]] || []),
                    item,
                ],
            }),
            {},
        );
    },
    countBy(items, key) {
        let group = this.groupBy(items, key);

        for (let key of Object.keys(group)) {
            group[key] = group[key].length;
        }

        return group;
    },
    countKey(items, key) {
        return items.filter(el => el[key] !== null).reduce(function (accumulator, entry) {
            return accumulator + 1;
        }, 0);
    },
    sumOfKeyElements(items, key) {
        return items.filter(el => el[key] !== null).reduce(function (accumulator, entry) {
            return accumulator + entry[key].length;
        }, 0);
    },
    sumOfKeys(items, key) {
        return items.filter(el => el[key] !== null).reduce(function (accumulator, entry) {
            return accumulator + entry[key];
        }, 0);
    },
    averageOfKeys(items, key) {
        let sum = items.filter(el => el[key] !== null).reduce(function (accumulator, entry) {
            return accumulator + entry[key];
        }, 0);
        let len = items.filter(el => el[key] !== null).length;
        let average = sum / len;
        return average.toFixed(2);
    },
    lengthOfKeys(items, key) {
        return items.filter(el => el[key] !== null).map((el) => el[key].length);
    },
    mapToKey(items, key) {
        return items.filter(el => el[key] !== null).map((el) => el[key]);
    },
    lengthOfKey(entity, key) {
        return entity !== undefined && entity !== null && entity[key] !== undefined && entity[key] !== null ? entity[key].length : 0;
    }
}
