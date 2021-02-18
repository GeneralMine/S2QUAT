const fetch = require("node-fetch");

const entities = ["companies", "employees", "models", "projects", "questionAnswers", "questions", "scenarios", "surveyResponses", "testPersons", "users"];

const serviceURL = "http://localhost:21021/";

const testCases = [
    /**
     * Testablauf
     * Entities
     * Für jedes Entitiy
     *      insert 5 reale Beispiele
     *      insert 1 blödsinniges/spaßiges Beispiel
     *      list aller 6 Beispiele
     *      update das blöde Beispiel in was anderes
     *      list aller 6 Beispiele
     *      remove das blöde Beispiel
     *      list aller 5 Beispiele
     * 
     * Relationships
     * 2 Typen
     *      Listen: Add/Get/Remove
     *      Value: Set/Get
     * Für jede Entitiy
     *      öffne Ordner (linke Seite)
     *          für jedes Value (Set/Get)
     */


    /**
     *  Entity Functions
     */

    // Companies

    {
        name: "List",
        entity: "companies",
        operation: "list",
        expectedCode: 200,
        expectedOutput: [
            {
                id: 1,
                name: 'Fraunhofer IAO',
                logo: 'fraunhofer.png',
                projects: [],
                employees: []
            },
            {
                id: 2,
                name: "Technische Universität München",
                logo: "tum.png",
                projects: [],
                employees: []
            },
            {
                id: 3,
                name: "Universität Stuttgart",
                logo: "uni_stuttgart.png",
                projects: [],
                employees: []
            },
            {
                id: 4,
                name: 'HansEntertainment GmbH',
                logo: 'test.png',
                projects: [],
                employees: []
            },
            {
                id: 5,
                name: 'Flughafen Stuttgart',
                logo: 'StuttgartAirport.png',
                projects: [],
                employees: []
            },
            {
                id: 6,
                name: 'Neckar Fils Realschule',
                logo: 'RSP.png',
                projects: [],
                employees: []
            }
        ]
    },

    {
        name: "Rename Hans to rngesus",
        entity: "companies",
        operation: "update",
        testData: {
            id: 6,
            name: "RNGesus GmbH",
            logo: "from the holy"
        },
        expectedCode: 200,
    },

    {
        name: "Remove rngesus",
        entity: "companies",
        operation: "remove",
        testData: {
            id: 4
        },
        expectedCode: 200,
    },

    // Employees

    {
        name: "List",
        entity: "employees",
        operation: "list",
        expectedCode: 200,
        expectedOutput: [
            {
                id: 1,
                name: "Marvin Raiser",
                phoneNumber: "1337",
                email: "random@rngesus.net",
                employs: null,
                supervising: null,
                substitutedBy: null,
                substitutes: null
            },
            {
                id: 2,
                name: "Julius Weber",
                phoneNumber: "42",
                email: "julius.beschder@mann.euwest",
                employs: null,
                supervising: null,
                substitutedBy: null,
                substitutes: null
            }
        ]
    },

    {
        name: "Remove Julius",
        entity: "employees",
        operation: "remove",
        testData: {
            id: 2
        },
        expectedCode: 200,
    },


    /**
     * Relationships
     */

    // Companies

    {
        name: "",
        entity: "companies",
        operation: "addEmployee",
        testData: {
            "companyID": 1,
            "employeeID": 1
        },
        expectedCode: 200,
    },

    {
        name: "",
        entity: "companies",
        operation: "getEmployees",
        testData: {
            "companyID": 1
        },
        expectedCode: 200,
        expectedOutput: {

        }
    },

    {
        name: "",
        entity: "companies",
        operation: "removeEmployees",
        testData: {
            "companyID": 1,
            "employeeID": 1
        },
        expectedCode: 200,
    },


    {
        name: "",
        entity: "projects",
        operation: "setCompany",
        testData: {
            "projectID": 1,
            "companyID": 1
        },
        expectedCode: 200,
    },

    {
        name: "",
        entity: "projects",
        operation: "setCompany",
        testData: {
            "projectID": 2,
            "companyID": 2
        },
        expectedCode: 200,
    },

    {
        name: "",
        entity: "projects",
        operation: "setCompany",
        testData: {
            "projectID": 3,
            "companyID": 3
        },
        expectedCode: 200,
    },

    {
        name: "",
        entity: "projects",
        operation: "setCompany",
        testData: {
            "projectID": 2,
            "companyID": 2
        },
        expectedCode: 200,
    },

    {
        name: "",
        entity: "employees",
        operation: "setCompany",
        testData: {
            "employeeID": 2,
            "companyID": 2
        },
        expectedCode: 200,
    },

    {
        name: "",
        entity: "employees",
        operation: "getCompany",
        expectedCode: 200,
        expectedOutput: {
            id: 2,
            name: "Technische Universität München",
            logo: "tum.png"
        }
    },

    {
        name: "",
        entity: "employees",
        operation: "setProject",
        testData: {
            "employeeID": 1,
            "projectID": 1
        },
        expectedCode: 200,
    },
];

main()
async function main() {

    await test();
    console.log("done.");
}


async function test() {
    console.log("Test started!");
    for (const test of testCases) {
        const testCaseTitle = test.entity + "/" + test.operation;
        try {
            const url = serviceURL + testCaseTitle;
            let res, code, data;
            if (test.operation !== "list") {
                // POST
                res = await post(url, test.testData);
            } else {
                // GET
                res = await get(url);
            }
            code = res.code;
            data = res.data;
            if (Array.isArray(data)) {
                for (const dataObject of data) {
                    delete dataObject.createdAt;
                    delete dataObject.updatedAt;
                }
            }

            let result = "";
            if (test.expectedCode !== code) {
                // Status code is wrong
                console.log("Got", code);
                console.log("Expected", test.expectedCode);
                console.log("at")
                result = "❌🆑";
            }
            else if (JSON.stringify(data) !== JSON.stringify(test.expectedOutput)) {
                // Output Data is wrong
                console.log("Got", data);
                console.log("Expected", test.expectedOutput);
                result = "❌🅾";
            }
            else {
                // when everything is correct
                result = "✅";
            }
            console.log(result + "\t| " + testCaseTitle + ": " + test.name);
        }
        catch (err) {
            console.error("Error at " + testCaseTitle + ": " + test.name + ": ", err);
        }
    };
    console.log("Test finished!");
}