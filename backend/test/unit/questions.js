module.exports = {
    name: "questions",
    url: "questions",
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
                        name: "Feld 1: Test lol",
                        description: "Eine test Beschreibung fürs 1. Feld",
                        depth: "0"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "valid required input",
                    testData: {
                        name: "Merkmal 13: Ganz anders",
                        depth: "1"
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
                        description: "",
                        depth: ""
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
                        depths: "69"
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
                        name: "Feld 1: Test lol",
                        description: "Eine test Beschreibung fürs 1. Feld",
                        depth: 0,
                        parent: null,
                        models: [],
                        questionAnswers: []
                    }
                },
                {
                    name: "get required entry",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Merkmal 13: Ganz anders",
                        description: null,
                        depth: 1,
                        parent: null,
                        models: [],
                        questionAnswers: []
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
                        name: "Faktor 42: Das Universum",
                        description: "Die Bedeutung des Universums und dem ganzen Rest",
                        depth: 3
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
                        name: "Kriterium 1337: Dekadenz",
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
                        description: "Für wie Dekadent halten sie sich?",
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only depth",
                    testData: {
                        depth: "2"
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
                        name: "Kriterium 1337: Dekadenz",
                        description: "Für wie Dekadent halten sie sich?",
                        depth: 2,
                        parent: null,
                        models: [],
                        questionAnswers: []
                    }
                },
                {
                    name: "correct update 2",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Faktor 42: Das Universum",
                        description: "Die Bedeutung des Universums und dem ganzen Rest",
                        depth: 3,
                        parent: null,
                        models: [],
                        questionAnswers: []
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
                            name: "Kriterium 1337: Dekadenz",
                            description: "Für wie Dekadent halten sie sich?",
                            depth: 2,
                            parent: null,
                            models: [],
                            questionAnswers: []
                        },
                        {
                            id: 2,
                            name: "Faktor 42: Das Universum",
                            description: "Die Bedeutung des Universums und dem ganzen Rest",
                            depth: 3,
                            parent: null,
                            models: [],
                            questionAnswers: []
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