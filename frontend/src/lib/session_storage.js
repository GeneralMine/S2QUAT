import { browser } from "$app/env";
import { writable } from "svelte/store";

export const token = mapToLocalStorage("token");

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
