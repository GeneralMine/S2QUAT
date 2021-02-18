module.exports = {
    name: "models",
    url: "models",
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
                        name: "Kaiserpinguine",
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "valid required input",
                    testData: {
                        name: "Königspinguin",
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
                        names: "Test",
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
                        name: "Kaiserpinguine",
                        questions: [],
                        scenario: null,
                    }
                },
                {
                    name: "get partly entry",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Königspinguin",
                        questions: [],
                        scenario: null,
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
                        name: "Müllentsorger",
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
                        name: "Stadtverwaltung",
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
                        name: "Stadtverwaltung",
                        questions: [],
                        scenario: null,
                    }
                },
                {
                    name: "correct update 2",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Müllentsorger",
                        questions: [],
                        scenario: null,
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
                            name: "Stadtverwaltung",
                            questions: [],
                            scenario: null,
                        },
                        {
                            id: 2,
                            name: "Müllentsorger",
                            questions: [],
                            scenario: null,
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