module.exports = {
    name: "users",
    url: "users",
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
                        name: "Erika Muster",
                        password: "Döner123",
                        email: "erika.muster@döner.de"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "valid required input 1",
                    testData: {
                        name: "Max Muster",
                        password: "Musterlol123",
                        email: "max.muster@jufka.de"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2
                    }
                },
                {
                    name: "valid required input 2",
                    testData: {
                        name: "Chris",
                        password: "Chris",
                        email: "chris@lol.de"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 3
                    }
                },
                {
                    name: "empty input",
                    testData: {
                        name: "",
                        password: "",
                        email: "",
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
                        passwords: "69",
                        emails: "asd"
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
                        status: 2,
                        name: "Erika Muster",
                        email: "erika.muster@döner.de",
                        roles: "",
                        projects: []
                    }
                },
                {
                    name: "get required entry 1",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        status: 2,
                        name: "Max Muster",
                        email: "max.muster@jufka.de",
                        roles: "",
                        projects: []
                    }
                },
                {
                    name: "get required entry 2",
                    url: "3",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 3,
                        status: 2,
                        name: "Chris",
                        email: "chris@lol.de",
                        roles: "",
                        projects: []
                    }
                },
                {
                    name: "get nonexisting entry",
                    url: "6",
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
                        status: "1",
                        name: "Julius",
                        password: "Julius123",
                        email: "julius.beschderMann@eu.west",
                        roles: "blocked"
                    },
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2
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
                    name: "only name",
                    testData: {
                        name: "Marvin",
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only password",
                    testData: {
                        password: "Tester123"
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
                    name: "only roles",
                    testData: {
                        roles: "admin,user,guest"
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
                        status: 0,
                        name: "Marvin",
                        email: "marvin@raiser.dev",
                        roles: "admin,user,guest",
                        projects: []
                    }
                },
                {
                    name: "correct update 2",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        status: 1,
                        name: "Julius",
                        email: "julius.beschderMann@eu.west",
                        roles: "blocked",
                        projects: []
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
                            status: 0,
                            name: "Marvin",
                            email: "marvin@raiser.dev",
                            roles: "admin,user,guest",
                            projects: []
                        },
                        {
                            id: 2,
                            status: 1,
                            name: "Julius",
                            email: "julius.beschderMann@eu.west",
                            roles: "blocked",
                            projects: []
                        },
                        {
                            id: 3,
                            status: 2,
                            name: "Chris",
                            email: "chris@lol.de",
                            roles: "",
                            projects: []
                        }
                    ]
                },
            ]
        },

        /**
         * LOGIN
         */
        {
            name: "login",
            type: "POST",
            testCases: [
                {
                    name: "active account",
                    testData: {
                        name: "Marvin",
                        password: "Tester123"
                    },
                    url: "login",
                    expectedCode: 200,
                    expectedOutput: {
                        user: {
                            id: 1,
                            status: 0,
                            name: "Marvin",
                            email: "marvin@raiser.dev",
                            roles: "admin,user,guest",
                        }
                    }
                },
                {
                    name: "inactive account",
                    testData: {
                        name: "Julius",
                        password: "Julius123"
                    },
                    url: "login",
                    expectedCode: 410,
                },
                {
                    name: "unverified account",
                    testData: {
                        name: "Chris",
                        password: "Chris"
                    },
                    url: "login",
                    expectedCode: 403,
                },
                {
                    name: "empty input",
                    testData: {
                        name: "",
                        password: "",
                    },
                    url: "login",
                    expectedCode: 400,
                },
                {
                    name: "missing input",
                    testData: {
                    },
                    url: "login",
                    expectedCode: 400,
                },
                {
                    name: "wrong keys input",
                    testData: {
                        names: "Test",
                        passwords: "69",
                    },
                    url: "login",
                    expectedCode: 400,
                }
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
                    name: "active account",
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: true
                },
                {
                    name: "inactive account",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: true
                },
                {
                    name: "unverified account",
                    url: "3",
                    expectedCode: 200,
                    expectedOutput: true
                },
                {
                    name: "nonexisting entry",
                    url: "6",
                    expectedCode: 500,
                },
            ]
        },

    ]
}