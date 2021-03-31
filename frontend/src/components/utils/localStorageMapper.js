import { writable } from "svelte/store";

export const mapObjectToLocalStorage = (key) => {
    // abort if executed on server while SSR
    if (typeof window === "undefined") return writable(undefined);

    // fetch initial value from local storage
    const initialValue = localStorage.getItem(key);

    let store;
    let initialObj;

    try {
        // try to parse JSON and fail quietly
        initialObj = JSON.parse(initialValue);
    } catch (err) {
        // json parse errors result in overridden localStorage
        initialObj = undefined;
    }

    // initializing store
    store = writable(initialObj);

    // update localStorage on store update
    store.subscribe(el => {
        localStorage.setItem(key, JSON.stringify(el));
    });

    return store;
}

export const mapStringToLocalStorage = (key) => {
    // abort if executed on server while SSR
    if (typeof window === "undefined") return writable(undefined);

    // fetch initial value from local storage
    const initialValue = localStorage.getItem(key);

    let store;

    if (initialValue == undefined) {
        // write null for any nullish value
        store = writable(undefined);
    } else {
        // write initial value if present
        store = writable(initialValue);
    }

    // update localStorage on store update
    store.subscribe(el => {
        localStorage.setItem(key, el);
    });

    return store;
}
