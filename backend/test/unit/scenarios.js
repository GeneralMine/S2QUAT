module.exports = {
    name: "scenarios",
    url: "scenarios",
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
                        name: "Schülerrekruten",
                        description: "Schüler die sich als Pinguinrekruten eignen",
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "valid required input",
                    testData: {
                        name: "PinguAusbilder",
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
                        description: ""
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
                        descriptions: "69"
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
                        name: "Schülerrekruten",
                        description: "Schüler die sich als Pinguinrekruten eignen",
                        model: null,
                        project: null,
                        surveyResponses: []
                    }
                },
                {
                    name: "get required entry",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "PinguAusbilder",
                        description: null,
                        model: null,
                        project: null,
                        surveyResponses: []
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
                        name: "Exzellente Studenten",
                        description: "Exzellente Studenten abgreifen die aktuell extrem gestresst sind",
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
                        name: "Müllabfuhrfahrer",
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only description",
                    testData: {
                        description: "Befragung der Müllabfuhrfahrer zu ihrem Alltag in Verwendung des Smartes Müllentsorgungssystems",
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
                        name: "Müllabfuhrfahrer",
                        description: "Befragung der Müllabfuhrfahrer zu ihrem Alltag in Verwendung des Smartes Müllentsorgungssystems",
                        model: null,
                        project: null,
                        surveyResponses: []
                    }
                },
                {
                    name: "correct update 2",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Exzellente Studenten",
                        description: "Exzellente Studenten abgreifen die aktuell extrem gestresst sind",
                        model: null,
                        project: null,
                        surveyResponses: []
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
                            name: "Müllabfuhrfahrer",
                            description: "Befragung der Müllabfuhrfahrer zu ihrem Alltag in Verwendung des Smartes Müllentsorgungssystems",
                            model: null,
                            project: null,
                            surveyResponses: []
                        },
                        {
                            id: 2,
                            name: "Exzellente Studenten",
                            description: "Exzellente Studenten abgreifen die aktuell extrem gestresst sind",
                            model: null,
                            project: null,
                            surveyResponses: []
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