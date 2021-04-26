module.exports = {
    name: "questionAnswers",
    url: "questionAnswers",
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
                        score: "1",
                        text: "Test"
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "valid required input score",
                    testData: {
                        score: "5",
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2
                    }
                },
                {
                    name: "valid required input text",
                    testData: {
                        text: "Test text lol",
                    },
                    expectedCode: 200,
                    expectedOutput: {
                        id: 3
                    }
                },
                {
                    name: "empty input",
                    testData: {
                        score: "",
                        text: null
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
                        scores: "Test",
                        texts: "asd"
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
                        score: 1,
                        text: "Test",
                        questions: [],
                        surveyResponse: null,
                    }
                },
                {
                    name: "get required entry score",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        score: 5,
                        text: null,
                        questions: [],
                        surveyResponse: null,
                    }
                },
                {
                    name: "get required entry text",
                    url: "3",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 3,
                        score: null,
                        text: "Test text lol",
                        questions: [],
                        surveyResponse: null,
                    }
                },
                {
                    name: "get nonexisting entry",
                    url: "4",
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
                        score: "3",
                        text: "Sehr gut"
                    },
                    url: "1",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 1
                    }
                },
                {
                    name: "only score",
                    testData: {
                        score: "2",
                    },
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2
                    }
                },
                {
                    name: "only text",
                    testData: {
                        text: "Teils teils",
                    },
                    url: "3",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 3
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
                        score: 3,
                        text: "Sehr gut",
                        questions: [],
                        surveyResponse: null,
                    }
                },
                {
                    name: "correct update only score",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 2,
                        score: 2,
                        text: null,
                        questions: [],
                        surveyResponse: null,
                    }
                },
                {
                    name: "correct update only text",
                    url: "3",
                    expectedCode: 200,
                    expectedOutput: {
                        id: 3,
                        score: null,
                        text: "Teils teils",
                        questions: [],
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
                            score: 3,
                            text: "Sehr gut",
                            questions: [],
                            surveyResponse: null,
                        },
                        {
                            id: 2,
                            score: 2,
                            text: null,
                            questions: [],
                            surveyResponse: null,
                        },
                        {
                            id: 3,
                            score: null,
                            text: "Teils teils",
                            questions: [],
                            surveyResponse: null,
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
                    name: "existing entry only score",
                    url: "2",
                    expectedCode: 200,
                    expectedOutput: true
                },
                {
                    name: "existing entry only text",
                    url: "3",
                    expectedCode: 200,
                    expectedOutput: true
                },
                {
                    name: "nonexisting entry",
                    url: "4",
                    expectedCode: 500,
                },
            ]
        },
    ]
}