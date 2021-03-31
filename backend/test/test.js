const fetch = require("node-fetch");
const assert = require('assert');
const path = require("path");
const fs = require('fs');

const doDelete = true;

const serviceURL = "http://localhost:23011";
const testingTypes = [
    "unit",
    "integration",
    "system"
]

async function test() {
    console.log("--- Testing S2QUAT-Backend! ---")
    for (const type of testingTypes) {

        describe(type + " testing:", () => {

            const dir = path.resolve("./test/" + type);
            let testObjects = fs.readdirSync(dir).map(filename => require(path.resolve("./test/" + type + "/" + filename)));

            for (const testObject of testObjects) {
                describe(testObject.name, () => {

                    for (const testOperation of testObject.testOperations) {

                        if (testOperation.name === "remove" && !doDelete)
                            continue;

                        describe(testOperation.name, () => {

                            for (const testCase of testOperation.testCases) {

                                it(testCase.name, async () => {
                                    let { actualCode, actualOutput } = await requestHandler(testOperation.type, serviceURL + "/" + testObject.url + (testCase.url !== undefined ? "/" + testCase.url : ""), testCase.testData);

                                    // get rid of dynamic unneccessary data
                                    if (actualOutput != null && typeof actualOutput === "object") {
                                        if ("createdAt" in actualOutput)
                                            delete actualOutput.createdAt;
                                        if ("updatedAt" in actualOutput)
                                            delete actualOutput.updatedAt;
                                        if (actualOutput.user != null && typeof actualOutput.user === "object" && "session" in actualOutput.user)
                                            delete actualOutput.user.session;
                                    }

                                    assert.deepStrictEqual(actualCode, testCase.expectedCode);
                                    assert.deepStrictEqual(actualOutput, testCase.expectedOutput);
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

async function requestHandler(type, url, data) {
    let requestObject = {
        method: type, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    if (type === "POST") {
        requestObject.headers = {
            'Content-Type': 'application/json'
        };
        requestObject.body = JSON.stringify(data);
    }

    const res = await fetch(url, requestObject);

    let actualCode = res.status;
    let actualOutput;
    try {
        actualOutput = await res.json();
    } catch (err) {
    }

    return { actualCode, actualOutput }
}

test();