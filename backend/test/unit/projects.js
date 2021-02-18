module.exports = {
    name: "projects",
    url: "projects",
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
                        name: "Pinguinrekrutierung",
                        status: "1",
                        description: "Pinguine müssen für die TUM rekrutiert werden!",
                        goal: "Exzellente Pinguine rekrutieren",
                        projectStart: "2020-11-25T12:02:14.000Z",
                        projectEnd: "2020-11-30T12:02:14.000Z"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "valid required input",
                    testData: {
                        name: "Pinguinsoldatentraining",
                        status: "1",
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
                        status: ""
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
                        statuss: "test.png"
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
                        name: "Pinguinrekrutierung",
                        status: 1,
                        description: "Pinguine müssen für die TUM rekrutiert werden!",
                        goal: "Exzellente Pinguine rekrutieren",
                        projectStart: "2020-11-25T12:02:14.000Z",
                        projectEnd: "2020-11-30T12:02:14.000Z",
                        company: null,
                        employee: null,
                        scenarios: [],
                        users: [],
                    }
                },
                {
                    name: "get required entry",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Pinguinsoldatentraining",
                        status: 1,
                        description: null,
                        goal: null,
                        projectStart: null,
                        projectEnd: null,
                        company: null,
                        employee: null,
                        scenarios: [],
                        users: [],
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
                        name: "Exzellenzinitiative",
                        status: "0",
                        description: "Aufgrund einzelner unexzellenten Pinguinen ist durch die Exzellenzinitaitive nun Aktion erforderlich! Wir evaluieren die Unexzellenz unserer Schlechtuine um ",
                        goal: "Exzellente Pinguine rekrutieren",
                        projectStart: "2020-11-25T11:02:14.000Z",
                        projectEnd: "2020-11-25T12:02:14.000Z",
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
                        name: "Smartes Müllentsorgungssystem",
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only status",
                    testData: {
                        status: "0",
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
                        description: "Die Müllentsorgung ist geplagt von vielen ineffizienten Fahrten durch leere Mülleimer"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only goal",
                    testData: {
                        goal: "Ein effizienteres Müllentsorgungssytem"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only projectStart",
                    testData: {
                        projectStart: "2020-11-30T11:02:14.000Z"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only projectEnd",
                    testData: {
                        projectEnd: "2020-12-25T11:02:14.000Z"
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
                        name: "Smartes Müllentsorgungssystem",
                        status: 0,
                        description: "Die Müllentsorgung ist geplagt von vielen ineffizienten Fahrten durch leere Mülleimer",
                        goal: "Ein effizienteres Müllentsorgungssytem",
                        projectStart: "2020-11-30T11:02:14.000Z",
                        projectEnd: "2020-12-25T11:02:14.000Z",
                        company: null,
                        employee: null,
                        scenarios: [],
                        users: [],
                    }
                },
                {
                    name: "correct update 2",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Exzellenzinitiative",
                        status: 0,
                        description: "Aufgrund einzelner unexzellenten Pinguinen ist durch die Exzellenzinitaitive nun Aktion erforderlich! Wir evaluieren die Unexzellenz unserer Schlechtuine um ",
                        goal: "Exzellente Pinguine rekrutieren",
                        projectStart: "2020-11-25T11:02:14.000Z",
                        projectEnd: "2020-11-25T12:02:14.000Z",
                        company: null,
                        employee: null,
                        scenarios: [],
                        users: [],
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
                            name: "Smartes Müllentsorgungssystem",
                            status: 0,
                            projectStart: "2020-11-30T11:02:14.000Z",
                            projectEnd: "2020-12-25T11:02:14.000Z",
                            company: null,
                            employee: null,
                            scenarios: [],
                            users: []
                        },
                        {
                            id: 2,
                            name: "Exzellenzinitiative",
                            status: 0,
                            projectStart: "2020-11-25T11:02:14.000Z",
                            projectEnd: "2020-11-25T12:02:14.000Z",
                            company: null,
                            employee: null,
                            scenarios: [],
                            users: []
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