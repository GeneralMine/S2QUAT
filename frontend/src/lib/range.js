export function range(from, to) {
    if (to === undefined) {
        to = from;
        from = 0;
    }

    let list = [];

    for (let i = from; i < to; i++) {
        list.push(i);
    }

    return list;
}