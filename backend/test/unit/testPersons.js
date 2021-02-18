module.exports = {
    name: "testPersons",
    url: "testPersons",
    testOperations: [
        /**
         * INSERT
         */
        {
            name: "insert",
            type: "POST",
            testCases: [
                {
                    name: "valid full input",
                    testData: {
                        name: "Hans Peter",
                        signature: "1",
                        gender: "male",
                        age: "27"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "valid required input",
                    testData: {
                        name: "Berta Dosenfleisch",
                        signature: "0"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2
                    }
                },
                {
                    name: "empty input",
                    testData: {
                        name: "",
                        signature: "",
                        gender: "",
                        age: ""
                    },
                    expectedCode: 400,
                },
                {
                    name: "missing input",
                    testData: {
                    },
                    expectedCode: 400,
                },
                {
                    name: "wrong keys input",
                    testData: {
                        names: "asd",
                        signatures: "1",
                        genders: "asd",
                        ages: "2"
                    },
                    expectedCode: 400,
                }
            ]
        },

        /**
         * GET
         */
        {
            name: "get",
            type: "GET",
            testCases: [
                {
                    name: "get full entry",
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1,
                        name: "Hans Peter",
                        signature: true,
                        gender: "male",
                        age: 27,
                        surveyResponse: null,
                    }
                },
                {
                    name: "get required entry",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Berta Dosenfleisch",
                        signature: false,
                        gender: null,
                        age: null,
                        surveyResponse: null,
                    }
                },
                {
                    name: "get nonexisting entry",
                    url: "3",
                    expectedCode: 500,
                },
            ]
        },

        /**
         * UPDATE
         */
        {
            name: "update",
            type: "POST",
            testCases: [
                {
                    name: "entire entry",
                    testData: {
                        name: "Julius Weber",
                        signature: true,
                        gender: "male",
                        age: 19,
                    },
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2
                    }
                },
                {
                    name: "only name",
                    testData: {
                        name: "Marvin Raiser"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only signature",
                    testData: {
                        signature: "0"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only gender",
                    testData: {
                        gender: "female"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only age",
                    testData: {
                        age: "20"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "nonexisting entry",
                    testData: {
                        name: "Sollte nicht klappen",
                    },
                    url: "6",
                    expectedCode: 500,
                },

            ]
        },

        /**
         * validation of update
         */
        {
            name: "validation of update",
            type: "GET",
            testCases: [
                {
                    name: "correct update 1",
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1,
                        name: "Marvin Raiser",
                        signature: false,
                        gender: "female",
                        age: 20,
                        surveyResponse: null,
                    }
                },
                {
                    name: "correct update 2",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Julius Weber",
                        signature: true,
                        gender: "male",
                        age: 19,
                        surveyResponse: null,
                    }
                },
            ]
        },

        /**
         * LIST
         */
        {
            name: "list",
            type: "GET",
            testCases: [
                {
                    name: "all entries",
                    expectedCode: 200,
                    expectedOutput: [
                        {
                            id: 1,
                            name: "Marvin Raiser",
                            signature: false,
                            gender: "female",
                            age: 20,
                            surveyResponse: null
                        },
                        {
                            id: 2,
                            name: "Julius Weber",
                            signature: true,
                            gender: "male",
                            age: 19,
                            surveyResponse: null
                        }
                    ]
                },
            ]
        },

        /**
         * REMOVE
         */
        {
            name: "remove",
            type: "DELETE",
            testCases: [
                {
                    name: "existing entry 1",
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: true
                },
                {
                    name: "existing entry 2",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: true
                },
                {
                    name: "nonexisting entry",
                    url: "3",
                    expectedCode: 500,
                },
            ]
        },
    ]
}