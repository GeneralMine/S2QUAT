import { browser } from "$app/env";
import { writable } from "svelte/store";

export function writeObject(k, v) {
    if (!browser) return;
    localStorage.setItem(k, stringifyOrNull(v));
}

export function readObject(k) {
    if (!browser) return;
    return parseOrNull(localStorage.getItem(k));
}

export function mapObjectToLocalStorage(key, initial_value = {}) {
    if (!browser) return;

    const stored_value = localStorage.getItem(key);

    if (stored_value !== null) {
        initial_value = stored_value;
    }

    const write = v => { localStorage.setItem(key, stringifyOrNull(v)); };

    const value = stringifyOrNull(initial_value);
    const store = writable(value);

    write(value);

    store.subscribe(value => write(value));

    return store;
}

function stringifyOrNull(obj) {
    try {
        return JSON.stringify(obj);
    } catch (err) {
        return null;
    }
}

function parseOrNull(str) {
    try {
        return JSON.parse(str);
    } catch (err) {
        return null;
    }
}