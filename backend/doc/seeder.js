const fetch = require("node-fetch");

const url = "http://localhost:23011"

inserts = [
    // Companies
    {
        entity: "companies",
        data: {
            name: "Fraunhofer IAO",
            logo: "fraunhofer.png"
        },
    },

    {
        entity: "companies",
        data: {
            name: "Technische Universität München",
            logo: "tum.png"
        },
    },

    {
        entity: "companies",
        data: {
            name: "Universität Stuttgart",
            logo: "uni_stuttgart.png"
        },
    },

    {
        entity: "companies",
        data: {
            name: "HansEntertainment GmbH",
            logo: "test.png"
        },
    },
    {
        entity: "companies",
        data: {
            name: "Flughafen Stuttgart",
            logo: "StuttgartAirport.png"
        },
    },

    {
        entity: "companies",
        data: {
            name: "Neckar Fils Realschule",
            logo: "RSP.png"
        },
    },

    // Employees
    {
        entity: "employees",
        data: {
            name: "Marvin Raiser",
            phoneNumber: "1337",
            email: "random@rngesus.net"
        },
    },

    {
        entity: "employees",
        data: {
            name: "Julius Weber",
            phoneNumber: "42",
            email: "julius.beschder@mann.euwest"
        },
    },
    {
        entity: "employees",
        data: {
            name: "Christian Ankele",
            phoneNumber: "0711",
            email: "chris@poland.pl"
        },
    },
    {
        entity: "employees",
        data: {
            name: "Test 4",
            phoneNumber: "23452345",
            email: "test4@germany.de"
        },
    },
    {
        entity: "employees",
        data: {
            name: "Test ",
            phoneNumber: "23423",
            email: "test5@germany.de"
        },
    },
    {
        entity: "employees",
        data: {
            name: "Test 6",
            phoneNumber: "12312312",
            email: "test6@germany.de"
        },
    },





    // Models
    {
        entity: "models",
        data: {
            name: "TestModel",
        },
    },
    {
        entity: "models",
        data: {
            name: "TestModel",
        },
    },
    {
        entity: "models",
        data: {
            name: "TestModel",
        },
    },
    {
        entity: "models",
        data: {
            name: "TestModel",
        },
    },
    {
        entity: "models",
        data: {
            name: "TestModel",
        },
    },
    {
        entity: "models",
        data: {
            name: "TestModel",
        },
    },


    // Projects
    {
        entity: "projects",
        data: {
            name: "TestProjekt",
            status: "1",
            description: "Eine Beispielbeschreibung für ein Testprojekt. Hier könnte noch vieeeeel mehr stehen...",
            goal: "Ziel ist es das Datenbanksystem zu testen!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "TestProjekt",
            status: "1",
            description: "Eine Beispielbeschreibung für ein Testprojekt. Hier könnte noch vieeeeel mehr stehen...",
            goal: "Ziel ist es das Datenbanksystem zu testen!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "TestProjekt",
            status: "1",
            description: "Eine Beispielbeschreibung für ein Testprojekt. Hier könnte noch vieeeeel mehr stehen...",
            goal: "Ziel ist es das Datenbanksystem zu testen!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "TestProjekt",
            status: "1",
            description: "Eine Beispielbeschreibung für ein Testprojekt. Hier könnte noch vieeeeel mehr stehen...",
            goal: "Ziel ist es das Datenbanksystem zu testen!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "TestProjekt",
            status: "1",
            description: "Eine Beispielbeschreibung für ein Testprojekt. Hier könnte noch vieeeeel mehr stehen...",
            goal: "Ziel ist es das Datenbanksystem zu testen!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "TestProjekt",
            status: "1",
            description: "Eine Beispielbeschreibung für ein Testprojekt. Hier könnte noch vieeeeel mehr stehen...",
            goal: "Ziel ist es das Datenbanksystem zu testen!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },

    // QuestionAnswers
    {
        entity: "questionAnswers",
        data: {
            score: 3,
        },
    },
    {
        entity: "questionAnswers",
        data: {
            score: 3,
        },
    },
    {
        entity: "questionAnswers",
        data: {
            score: 3,
        },
    },
    {
        entity: "questionAnswers",
        data: {
            score: 3,
        },
    },
    {
        entity: "questionAnswers",
        data: {
            score: 3,
        },
    },
    {
        entity: "questionAnswers",
        data: {
            score: 3,
        },
    },

    // Questions
    {
        entity: "questions",
        data: {
            name: "TestQuestion1",
            description: "Erstes Feld",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "TestQuestion1",
            description: "Erstes Feld",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "TestQuestion1",
            description: "Erstes Feld",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "TestQuestion1",
            description: "Erstes Feld",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "TestQuestion1",
            description: "Erstes Feld",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "TestQuestion1",
            description: "Erstes Feld",
            depth: 0,
        },
    },

    // Scenarios
    {
        entity: "scenarios",
        data: {
            name: "TestSzenario",
            description: "Eine Beispielbeschreibung für ein Testszenario. Hier könnte noch vieeeeel mehr stehen..."
        },
    },
    {
        entity: "scenarios",
        data: {
            name: "TestSzenario",
            description: "Eine Beispielbeschreibung für ein Testszenario. Hier könnte noch vieeeeel mehr stehen..."
        },
    },
    {
        entity: "scenarios",
        data: {
            name: "TestSzenario",
            description: "Eine Beispielbeschreibung für ein Testszenario. Hier könnte noch vieeeeel mehr stehen..."
        },
    },
    {
        entity: "scenarios",
        data: {
            name: "TestSzenario",
            description: "Eine Beispielbeschreibung für ein Testszenario. Hier könnte noch vieeeeel mehr stehen..."
        },
    },
    {
        entity: "scenarios",
        data: {
            name: "TestSzenario",
            description: "Eine Beispielbeschreibung für ein Testszenario. Hier könnte noch vieeeeel mehr stehen..."
        },
    },
    {
        entity: "scenarios",
        data: {
            name: "TestSzenario",
            description: "Eine Beispielbeschreibung für ein Testszenario. Hier könnte noch vieeeeel mehr stehen..."
        },
    },

    // SurveyResponses
    {
        entity: "surveyResponses",
        data: {
            valid: 1,
            date: "2020-11-25T11:02:14.291Z",
            place: "Stuttgart",
            feedbackNotes: "Just some feedback from the testPerson",
            personalNotes: "Just some crazy notes from the consultant (so personal stuff)"
        },
    },
    {
        entity: "surveyResponses",
        data: {
            valid: 1,
            date: "2020-11-25T11:02:14.291Z",
            place: "Stuttgart",
            feedbackNotes: "Just some feedback from the testPerson",
            personalNotes: "Just some crazy notes from the consultant (so personal stuff)"
        },
    },
    {
        entity: "surveyResponses",
        data: {
            valid: 1,
            date: "2020-11-25T11:02:14.291Z",
            place: "Stuttgart",
            feedbackNotes: "Just some feedback from the testPerson",
            personalNotes: "Just some crazy notes from the consultant (so personal stuff)"
        },
    },
    {
        entity: "surveyResponses",
        data: {
            valid: 1,
            date: "2020-11-25T11:02:14.291Z",
            place: "Stuttgart",
            feedbackNotes: "Just some feedback from the testPerson",
            personalNotes: "Just some crazy notes from the consultant (so personal stuff)"
        },
    },
    {
        entity: "surveyResponses",
        data: {
            valid: 1,
            date: "2020-11-25T11:02:14.291Z",
            place: "Stuttgart",
            feedbackNotes: "Just some feedback from the testPerson",
            personalNotes: "Just some crazy notes from the consultant (so personal stuff)"
        },
    },
    {
        entity: "surveyResponses",
        data: {
            valid: 1,
            date: "2020-11-25T11:02:14.291Z",
            place: "Stuttgart",
            feedbackNotes: "Just some feedback from the testPerson",
            personalNotes: "Just some crazy notes from the consultant (so personal stuff)"
        },
    },

    // TestPersons
    {
        entity: "testPersons",
        data: {
            name: "Hans Peter Mustermann",
            signature: 1,
            age: 18,
            gender: "female"
        },
    },
    {
        entity: "testPersons",
        data: {
            name: "Hans Peter Mustermann",
            signature: 1,
            age: 18,
            gender: "female"
        },
    },

    {
        entity: "testPersons",
        data: {
            name: "Hans Peter Mustermann",
            signature: 1,
            age: 18,
            gender: "female"
        },
    },

    {
        entity: "testPersons",
        data: {
            name: "Hans Peter Mustermann",
            signature: 1,
            age: 18,
            gender: "female"
        },
    },

    {
        entity: "testPersons",
        data: {
            name: "Hans Peter Mustermann",
            signature: 1,
            age: 18,
            gender: "female"
        },
    },

    {
        entity: "testPersons",
        data: {
            name: "Hans Peter Mustermann",
            signature: 1,
            age: 18,
            gender: "female"
        },
    },


    // Users
    {
        entity: "users",
        data: {
            name: "GeneralMine",
            password: "Tester123",
            email: "marvin_raiser@web.de"
        },
    },
    {
        entity: "users",
        data: {
            name: "GeneralMine",
            password: "Tester123",
            email: "marvin_raiser@web.de"
        },
    },
    {
        entity: "users",
        data: {
            name: "GeneralMine",
            password: "Tester123",
            email: "marvin_raiser@web.de"
        },
    },
    {
        entity: "users",
        data: {
            name: "GeneralMine",
            password: "Tester123",
            email: "marvin_raiser@web.de"
        },
    },
    {
        entity: "users",
        data: {
            name: "GeneralMine",
            password: "Tester123",
            email: "marvin_raiser@web.de"
        },
    },
    {
        entity: "users",
        data: {
            name: "GeneralMine",
            password: "Tester123",
            email: "marvin_raiser@web.de"
        },
    },
]

function seed(inserts) {
    inserts.forEach(async (element) => {
        await post(url + "/" + element.entity, element.data)
    });

}

seed(inserts);

async function post(url, dataToSend) {
    const res = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(dataToSend) // body data type must match "Content-Type" header
    });
}