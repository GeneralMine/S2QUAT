const fetch = require("node-fetch");

const url = "http://localhost:21021"

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
            name: "Pinguine bei Fütterung",
        },
    },
    {
        entity: "models",
        data: {
            name: "Menschensklaven",
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
            name: "🐧 Automatische Pinguinfütterung 🐧",
            status: "0",
            description: "Eine neue Anlage soll im Zoo das Füttern der Pinguine automatisieren und erheblich vereinfachen.",
            goal: "Ziel ist es die Pinguine automatisch zu füttern!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "🐧 Pinguinwahlsystem 🐧",
            status: "1",
            description: "Die Pinguinkolonie im Münchner Zoo würde gerne demokratische Wahlen in ihrem Weltherrschaftsgremium einführen. Ein Wahlsystem soll dies anonymisiert ermöglich und verwalten, sodass keine menschlichen Sklaven mehr nötig sein werden",
            goal: "Ziel ist es demokratische Wahlen innerhalb der Pinguinkolonie umzusetzen! 🐧",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "Remote Control von Menschen",
            status: "2",
            description: "Die Kaiserpinguine möchten mithilfe eines neuronalen Implantats ihre menschlichen Sklaven besser kontrollieren und überwachen können. Durch eine KI sollen die neuronalen Signale besser entschlüsselt werden können und präzisere Steuerung möglich werden.",
            goal: "Ziel ist die absolute Kontrolle über die Menschen!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "Computervirus zur Unterwerfung",
            status: "2",
            description: "Ein Computervirus soll jedes elektronische Gerät der Menschen infizieren, um den Pinguinen bei ihrer Machtergreifung jegliche Infrastruktur zugänglich und kontrollierbar zu machen. Die gehackten Geräten sollen zur Unterwerfung der Menschheit eingesetzt werden können.",
            goal: "Ziel ist die technische Unterverfung der Menschheit!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "TestProjekt",
            status: "0",
            description: "Eine Beispielbeschreibung für ein Testprojekt. Hier könnte noch vieeeeel mehr stehen...",
            goal: "Ziel ist es das Datenbanksystem zu testen!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },
    {
        entity: "projects",
        data: {
            name: "Anderes TestProjekt",
            status: "1",
            description: "Gannnz anders lol! Eine Beispielbeschreibung für ein Testprojekt. Hier könnte noch vieeeeel mehr stehen...",
            goal: "Ziel ist es das Datenbanksystem zu testen!",
            projectStart: "2020-11-25T11:02:14.291Z",
            projectEnd: "2020-11-25T12:02:14.291Z"
        },
    },

    // QuestionAnswers
    {
        entity: "questionAnswers",
        data: {
            type: 0,
            score: 5,
            text: "Gängige Praxis bei uns"
        },
    },
    {
        entity: "questionAnswers",
        data: {
            type: 1,
            score: 2,
        },
    },
    {
        entity: "questionAnswers",
        data: {
            type: 2,
            text: "Das Team hat es nicht gut aufgenommen",
        },
    },
    {
        entity: "questionAnswers",
        data: {
            type: 0,
            score: 3,
            text: "Ganz okay"
        },
    },
    {
        entity: "questionAnswers",
        data: {
            type: 1,
            score: 4,
        },
    },
    {
        entity: "questionAnswers",
        data: {
            type: 2,
            text: "Exzellent",
        },
    },

    // Questions
    {
        entity: "questions",
        data: {
            name: "Feld 1: Adéliepinguin",
            description: "Erwachsene Adéliepinguine können bis 75 cm groß werden, meistens überschreiten sie jedoch nicht die Grenze von 70 cm. Das Gewicht eines Adéliepinguins kann sehr stark variieren. Männchen wiegen vor der Fastenzeit rund 6 kg, danach meistens nur noch 3.1 kg. Auch die Weibchen verlieren während der Fastenzeit mit 2.8 kg viel Gewicht. (Von 5.5 kg auf 2.7 kg). ",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "Feld 2: Kaiserpinguine",
            description: "Ausgewachsene Männchen sind mit bis zu 130 cm die größten heute lebenden Pinguine, selbst die Weibchen sind mit 120 cm noch beachtlich groß. Nach der 4-monatigen Fastenzeit der Männchen während der Brutzeit sind diese jedoch durchschnittlich kleiner als die Weibchen und auf bis zu 110 cm geschrumpft.",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "Feld 3: Königspinguine",
            description: "Ausgewachsene Tiere sind zwischen 85 und 95 cm groß, die Männchen sind in der Regel größer als die Weibchen. Das Körpergewicht der Tiere schwankt von Kolonie zu Kolonie und kann zwischen 11.5 kg für die Weibchen / 12.8 kg für die Männchen auf Crozen Islands und 14.1 kg für die Weibchen / 16 kg für die Männchen in Süd Georgien betragen. Manche Tiere wiegen vor der Brutzeit bis zu 20 kg ! ",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "Feld 4: Goldschopfpinguin",
            description: "Mit 72 cm Körpergröße gehört der Goldschopfpinguin zu den größten Pinguinen aus der Gattung Eudyptes. Er kann sogar bis zu 77 cm groß werden, manche Goldschopfpinguine bleiben aber ihr Leben lang 65 cm groß. Goldschopfpinguine haben je nach Jahreszeit und Jungenaufzucht ein sehr unterschiedliches Gewicht. In der Regel sind jedoch die Weibchen schwerer als die Männchen. Sie verlieren während der extrem anstrengenden Paarungs- und Brutzeit meistens 50% ihres Körpergewichts in 25 Tagen, manchmal aber auch mehr oder weniger.",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "Feld 5: Galápagospinguin",
            description: "Erwachsene Galápagospinguine sind ungefähr 50 cm groß. Ihr Gewicht ist geschlechts- und saisonabhängig und liegt beim Männchen zwischen durchschnittlich 2.5 kg vor der Mauser und unmittelbar danach bei 1.73 kg. Die meiste Zeit des Jahres liegt das Gewicht eines Galápagospinguinmännchens bei ca. 2 kg. Die Weibchen sind etwas leichter, sie wiegen im Schnitt nur ca. 1.9 kg. Ihr Höchstgewicht liegt mit durchschnittlich 2.46 kg vor der Mauser nur knapp unter dem der Männchen, ihr Tiefstgewicht erreichen Galápagospinguinweibchen kurz nach der Eiablage mit rund 1.57 kg durchschnittlich. ",
            depth: 0,
        },
    },
    {
        entity: "questions",
        data: {
            name: "Feld 6: Brillenpinguine",
            description: "Brillenpinguine leben wie andere Vertreter ihrer Gattung fast ausschließlich von Schwarmfischen (Engraulis capensis, Sardinops ocellata, Trachurus trachurus, Etrumeus teres, Sufflogobius bibarbatus), der Rest ihres Speiseplans setzt sich aus verschiedensten Krustentieren und kleinen Krebsen zusammen (Nyctiphares capensis, Jasus lalandii, Squilla armata).",
            depth: 0,
        },
    },

    // Scenarios
    {
        entity: "scenarios",
        data: {
            name: "Pinguine bei Fütterung",
            description: "Pinguine während einer automatischen Fütterung durch die neue KI Fütterungsanlage"
        },
    },
    {
        entity: "scenarios",
        data: {
            name: "Menschliche Sklaven der Pinguine",
            description: "Wie fühlen sich die Menschen Sklaven der Pinguine?"
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