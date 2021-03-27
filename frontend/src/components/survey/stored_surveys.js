import { get } from "svelte/store";
import { mapObjectToLocalStorage } from "../utils/localStorageMapper";

export const scenarios = mapObjectToLocalStorage("stored_scenarios");
export const models = mapObjectToLocalStorage("stored_models");

const localstorage_prefix_model = "mo_";

function load(key) {
    let item = localStorage.getItem(key);

    if (item === null) {
        throw new Error("Model was not saved!");
    }

    return JSON.parse(item);
}

export function loadScenario(id) {
    return load(localstorage_prefix_scenario + id);
}

export function loadModel(id) {
    return load(localstorage_prefix_model + id)
}

export function storeScenario(scenario, model) {
    // store the model
    storeModel(model);

    // store scenario
    get(scenarios)[scenario.id] = scenario;
}

export function storeModel(model) {
    const key = localstorage_prefix_model + model.id;

    // store the model
    localStorage.setItem(key, JSON.stringify(model));

    // remember we saved this model
    models.set(get(models).filter(el => el !== model.id).push(model.id));
}
