import { writable } from "svelte/store"

export const crumbs = writable([]);

export class CrumbBuilder {
    /**
     * @param {string} name
     * @param {string} url
     * @param {string} icon
     * @param {Page[]?} subpages
     */
    constructor(name, url, icon, subpages = []) {
        this.page = { name, url, icon };
        this.subpages = subpages;
    }
    /**
     * Shorthand instead of constructor (better chaining)
     * 
     * @param {string} name
     * @param {string} url
     * @param {string} icon
     * @param {Page[]?} subpages
     * @returns {CrumbBuilder}
     */
    static create(name, url, icon, subpages = []) {
        return new CrumbBuilder(name, url, icon, subpages);
    }
    /**
     * @param {string} name
     * @param {string} url
     * @param {string} icon
     */
    addSubpage(name, url, icon) {
        this.subpages.push({ name, url, icon });
        return this;
    }
    /**
     * @returns {Breadcrumb}
     */
    build() {
        return { page: this.page, subpages: this.subpages }
    }
}

// export const lookup = {
//     modell: {
//         name: "modelll",
//         icon: "modell",
//         url: "modell"
//     },
//     vorlagen: {
//         name: "Vorlagen",
//         icon: "vorlagen",
//         url: "vorlagen"
//     },
//     unternehmen: {
//         name: "Unternehmen",
//         icon: "unternehmen",
//         url: "unternehmen"
//     },
//     employees: {
//         name: "Ansprechpartner",
//         icon: "employees",
//         url: "employees"
//     },
//     projekte: {
//         name: "Projekte",
//         icon: "projekte",
//         url: "projekte"
//     },
//     users: {
//         name: "Bearbeiter",
//         icon: "users",
//         url: "users"
//     },
//     evaluation: {
//         name: "Evaluation",
//         icon: "evaluation",
//         url: "evaluation"
//     },
//     surveys: {
//         name: "Fragebögen",
//         icon: "surveys",
//         url: "surveys"
//     },
//     responses: {
//         name: "Antworten",
//         icon: "surveyResponses",
//         url: "responses"
//     }
// };

// export function parse(path, entity) {
//     // split by /

//     let parts = path.split("/");
//     let cruumbs = [];

//     for (const part in parts) {

//         let parsed;
//         const lastCrumb = cruumbs[cruumbs.length - 1];

//         if ((parsed = parseIfStringIsNumber(part)) !== undefined) {
//             // is number a.k.a. parse
//             if (entity) {
//                 lastCrumb.name = entity[parsed];
//             }
//             lastCrumb.url += "/" + parsed;
//         } else {
//             // is string
//             let newCrumb = lookup[part];
//             newCrumb.url = lastCrumb.url + "/" + newCrumb.url;
//             cruumbs.push(newCrumb);
//         }
//     }

//     return cruumbs;
// }

// function parseIfStringIsNumber(str) {
//     try {
//         return parseInt(str);
//     } catch (err) {
//         return undefined;
//     }
// }