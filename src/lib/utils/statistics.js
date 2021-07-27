// Absolute Häufigkeit
export function absoluteFrequency(list) {
    let freq = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
    };

    for (const element of list) {
        freq["" + element]++;
    }

    return freq;
}

// Relative Häufigkeit
export function relativeFrequency(list) {
    let freq = absoluteFrequency(list);

    for (let i = 1; i <= 5; i++) {
        freq["" + i] = freq["" + i] / list.length;
    }

    return freq;
}

// Mittelwert
export function average(list) {
    return list.reduce(function (a, b) {
        return a + b;
    }) / list.length;
}

// Median
export function median(list) {
    return list[Math.floor(list.length / 2)];
}

// Modus/Modalwert = der Wert der am häufigsten vorkommt
export function modus(list) {
    let freq = absoluteFrequency(list);
    let maxI = 1;
    for (let i = 1; i <= 5; i++) {
        if (freq["" + i] > freq["" + maxI]) {
            maxI = i;
        }
    }
    return freq["" + maxI];
}

// Standardabweichung
export function variance(list) {
    let avg = average(list);
    let sum = 0;

    for (let num of list) {
        sum += Math.pow(num - avg, 2);
    }

    return Math.sqrt(sum / (list.length - 1));
}

// Minimum
export function min(list) {
    return list[0];
}

// Maximum
export function max(list) {
    return list[list.length - 1];
}

// unteres Quartil
export function lowerQuartile(list) {
    return list[Math.floor(list.length / 4)];
}

// oberes Quartil
export function upperQuartile(list) {
    return list[Math.floor(list.length / 4 * 3)];
}