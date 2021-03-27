import { get } from "svelte/store";
import { mapObjectToLocalStorage } from "../utils/localStorageMapper";

export const scenarios = mapObjectToLocalStorage("stored_scenarios");
export const models = mapObjectToLocalStorage("stored_models");

const localstorage_prefix_scenario = "ss_";
const localstorage_prefix_model = "mo_";

async function fml() {
    try {
        let a = getStoredScenario(12345);
    } catch (err) {
        alert("I'm fucked");
    }
}

export function getStoredScenario(id) {
    return new Promise((resolve, reject) => {
        let item = localStorage.getItem(localstorage_prefix_scenario + id)

        if (item === null) {
            return reject("Scenario wasn't saved!");
        }

        return resolve(JSON.parse(item));
    });
}

export function storeScenario(id, scenario, model) {
    scenario.model = scenario.model.id;
    localStorage.setItem(id, JSON.stringify(scenario));

    scenarios.set([...get(scenarios), id]);
}
