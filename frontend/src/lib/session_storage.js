import { browser } from "$app/env";
import { writable } from "svelte/store";

export const token = mapToLocalStorage("token");
export const stored_user = mapObjectToLocalStorage("stored_user");

function mapObjectToLocalStorage(key) {
    if (!browser) { return writable("") }

    let initial_value;
    let stored_value = localStorage.getItem(key);

    if (stored_value === null) {
        initial_value = ""
    } else {
        initial_value = stored_value;
    }

    const my_store = writable(tryDeserialize(initial_value));

    my_store.subscribe(el => localStorage.setItem(key, JSON.stringify(el)));

    return my_store;
}

function tryDeserialize(str) {
    try {
        return JSON.parse(str);
    } catch (err) {
        return null;
    }
}

function mapToLocalStorage(key) {
    if (!browser) { return writable("") }

    let initial_value;
    let stored_value = localStorage.getItem(key);

    if (stored_value === null) {
        initial_value = ""
    } else {
        initial_value = stored_value;
    }


    const my_store = writable(initial_value);

    my_store.subscribe(el => localStorage.setItem(key, el));

    return my_store;
}
