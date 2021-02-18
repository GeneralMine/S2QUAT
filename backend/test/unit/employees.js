module.exports = {
    name: "employees",
    url: "employees",
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
                        name: "Pingu",
                        phoneNumber: "+1 987 65432101",
                        email: "pingu@raiser.dev"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "valid required input",
                    testData: {
                        name: "Christian Ankele",
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
                        phoneNumber: "",
                        email: ""
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
                        mailllll: "test"
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
                        name: "Pingu",
                        phoneNumber: "+1 987 65432101",
                        email: "pingu@raiser.dev",
                        company: null,
                        project: null,
                        substitutedBy: null,
                        substitutes: null,
                    }
                },
                {
                    name: "get partly entry",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Christian Ankele",
                        phoneNumber: null,
                        email: null,
                        company: null,
                        project: null,
                        substitutedBy: null,
                        substitutes: null,
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
                        phoneNumber: "+11231234567",
                        email: "julius.beschder@mann.euwest"
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
                        name: "Marvin Raiser",
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only phoneNumber",
                    testData: {
                        phoneNumber: "+49 123 1234567",
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only email",
                    testData: {
                        email: "marvin@raiser.dev"
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
                        phoneNumber: "+49 123 1234567",
                        email: "marvin@raiser.dev",
                        company: null,
                        project: null,
                        substitutedBy: null,
                        substitutes: null,
                    }
                },
                {
                    name: "correct update 2",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        name: "Julius Weber",
                        phoneNumber: "+11231234567",
                        email: "julius.beschder@mann.euwest",
                        company: null,
                        project: null,
                        substitutedBy: null,
                        substitutes: null,
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
                            phoneNumber: "+49 123 1234567",
                            email: "marvin@raiser.dev",
                            company: null,
                            project: null,
                            substitutedBy: null,
                            substitutes: null,
                        },
                        {
                            id: 2,
                            name: "Julius Weber",
                            phoneNumber: "+11231234567",
                            email: "julius.beschder@mann.euwest",
                            company: null,
                            project: null,
                            substitutedBy: null,
                            substitutes: null,
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