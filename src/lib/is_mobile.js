import { writable } from "svelte/store";

export const is_mobile = writable(window.innerWidth < 768);