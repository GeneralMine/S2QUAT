module.exports = {
    name: "surveyResponses",
    url: "surveyResponses",
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
                        valid: 0,
                        date: "2020-11-25T11:02:14.000Z",
                        place: "Stuttgart",
                        feedbackNotes: "Just some feedback from the testPerson",
                        personalNotes: "Just some crazy notes from the consultant (so personal stuff)"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "valid required input",
                    testData: {
                        valid: 1,
                        date: "2020-11-30T11:02:14.000Z",
                        place: "Fraunhofer",
                        feedbackNotes: "Gut verlaufen",
                        personalNotes: "Extrem aufgeregte Person"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2
                    }
                },
                {
                    name: "empty input",
                    testData: {
                        valid: "",
                        date: "",
                        place: "",
                        feedbackNotes: "",
                        personalNotes: ""
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
                        valid: 0,
                        date: "2020-11-25T11:02:14.000Z",
                        place: "Stuttgart",
                        feedbackNotes: "Just some feedback from the testPerson",
                        personalNotes: "Just some crazy notes from the consultant (so personal stuff)",
                        scenario: null,
                        testPerson: null,
                        questionAnswers: []
                    }
                },
                {
                    name: "get required entry",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        valid: 1,
                        date: "2020-11-30T11:02:14.000Z",
                        place: "Fraunhofer",
                        feedbackNotes: "Gut verlaufen",
                        personalNotes: "Extrem aufgeregte Person",
                        scenario: null,
                        testPerson: null,
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
                        valid: 0,
                        date: "2020-11-28T11:02:14.000Z",
                        place: "Müllabfuhrfahrzeug",
                        feedbackNotes: "Schwierigkeiten an die Person zu kommen",
                        personalNotes: "Unehrliche Durchführung",
                    },
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2
                    }
                },
                {
                    name: "only valid",
                    testData: {
                        valid: 1,
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only date",
                    testData: {
                        date: "2020-12-25T11:02:14.000Z"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only place",
                    testData: {
                        place: "TUM Online"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only feedbackNotes",
                    testData: {
                        feedbackNotes: "So exzellent, kein Kommentar nötig"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only personalNotes",
                    testData: {
                        personalNotes: "Die TUMler sind mega exzellent!!"
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
                        valid: 1,
                        date: "2020-12-25T11:02:14.000Z",
                        place: "TUM Online",
                        feedbackNotes: "So exzellent, kein Kommentar nötig",
                        personalNotes: "Die TUMler sind mega exzellent!!",
                        scenario: null,
                        testPerson: null,
                        questionAnswers: []
                    }
                },
                {
                    name: "correct update 2",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        valid: 0,
                        date: "2020-11-28T11:02:14.000Z",
                        place: "Müllabfuhrfahrzeug",
                        feedbackNotes: "Schwierigkeiten an die Person zu kommen",
                        personalNotes: "Unehrliche Durchführung",
                        scenario: null,
                        testPerson: null,
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
                            valid: 1,
                            date: "2020-12-25T11:02:14.000Z",
                            place: "TUM Online",
                            feedbackNotes: "So exzellent, kein Kommentar nötig",
                            personalNotes: "Die TUMler sind mega exzellent!!",
                            scenario: null,
                            testPerson: null,
                            questionAnswers: []
                        },
                        {
                            id: 2,
                            valid: 0,
                            date: "2020-11-28T11:02:14.000Z",
                            place: "Müllabfuhrfahrzeug",
                            feedbackNotes: "Schwierigkeiten an die Person zu kommen",
                            personalNotes: "Unehrliche Durchführung",
                            scenario: null,
                            testPerson: null,
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