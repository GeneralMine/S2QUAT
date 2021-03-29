module.exports = {
    /**
     * Actions
     */
    actions: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'action', type: "text" },
            { name: 'user', type: "relationLink" },
            { name: 'entityName', type: "text" },
            { name: 'status', type: "status" },
            { name: 'updatedAt', type: "date" }
        ],
        categories: {}
    },
    /**
     * Companies
     */
    companies: {
        listAttributes: [
            { name: "id", type: "number" },
            { name: "logo", type: "img" },
            { name: "name", type: "text" },
            { name: "projects", type: "count" },
            { name: "employees", type: "count" }
        ],
        categories: {
            Allgemein: [
                { name: "logo", type: "img" },
                { name: "name", type: "text" }
            ],
            Projects:
                { name: "projects", type: "table" }
            ,
            Employees:
                { name: "employees", type: "table" }
            ,
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    },
    /**
     * Employees
     */
    employees: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'name', type: "text" },
            { name: 'company', type: "relationLink" },
            { name: 'project', type: "relationLink" },
            { name: 'phoneNumber', type: "text" },
            { name: 'email', type: "email" }
        ],
        categories: {
            Allgemein: [
                { name: "name", type: "text" },
                { name: "phoneNumber", type: "text" },
                { name: "email", type: "email" }
            ],
            Company:
                { name: "company", type: "list", entity: "companies" }
            ,
            Project:
                { name: "project", type: "list", entity: "projects" }
            ,
            SubstitutedBy:
                { name: "substitutedBy", type: "list", entity: "employees" }
            ,
            Substitutes:
                { name: "substitutes", type: "list", entity: "employees" }
            ,
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    },
    /**
     * Models
     */
    models: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'name', type: "text" },
            { name: 'scenario', type: "relationLink" },
            { name: 'questions', type: "count" }
        ],
        categories: {
            Allgemein: [
                { name: "name", type: "text" }
            ],
            Scenario:
                { name: "scenario", type: "list", entity: "scenarios" }
            ,
            Questions:
                { name: "questions", type: "model" }
            ,
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    },
    /**
     * Projects
     */
    projects: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'status', type: "status" },
            { name: 'name', type: "text" },
            { name: 'company', type: "relationLink" },
            { name: 'projectStart', type: "date" },
            { name: 'projectEnd', type: "date" }
        ],
        categories: {
            Allgemein: [
                { name: "status", type: "status" },
                { name: "name", type: "text" },
                { name: "description", type: "text" },
                { name: "goal", type: "text" },
                { name: "projectStart", type: "date" },
                { name: "projectEnd", type: "date" },
            ],
            Company:
                { name: "company", type: "list", entity: "companies" }
            ,
            Employee:
                { name: "employee", type: "list", entity: "employees" }
            ,
            Scenarios:
                { name: "scenarios", type: "table" }
            ,
            Users:
                { name: "users", type: "table" }
            ,
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    },
    /**
     * QuestionAnswers
     */
    questionAnswers: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'score', type: "number" },
            { name: 'questions', type: "count" },
            { name: 'surveyResponse', type: "relationLink" }
        ],
        categories: {
            Allgemein: [
                { name: "type", type: "type" },
                { name: "score", type: "number" },
                { name: "text", type: "text" }
            ],
            SurveyResponse:
                { name: "surveyResponse", type: "list", entity: "surveyResponses" }
            ,
            Questions:
                { name: "questions", type: "table" }
            ,
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    },
    /**
     * Questions
     */
    questions: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'depth', type: "number" },
            { name: 'name', type: "text" },
            { name: 'parent', type: "relationLink", entity: "questions" }
        ],
        categories: {
            Allgemein: [
                { name: "depth", type: "number" },
                { name: "name", type: "text" },
                { name: "description", type: "text" }
            ],
            Parent:
                { name: 'parent', type: "list", entity: "questions" }
            ,
            Models:
                { name: "models", type: "table" }
            ,
            QuestionAnswers:
                { name: "questionAnswers", type: "table" }
            ,
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    },
    /**
     * Scenarios
     */
    scenarios: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'name', type: "text" },
            { name: 'description', type: "text" },
            { name: 'project', type: "relationLink" },
            { name: 'model', type: "relationLink" }
        ],
        categories: {
            Allgemein: [
                { name: "name", type: "text" },
                { name: "description", type: "text" }
            ],
            Project:
                { name: "project", type: "list", entity: "projects" }
            ,
            Model:
                { name: "model", type: "list", entity: "models" }
            ,
            SurveyResponses:
                { name: "surveyResponses", type: "table" }
            ,
            // TODO: Score of answers!
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    },
    /**
     * SurveyResponses
     */
    surveyResponses: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'valid', type: "status" },
            { name: 'scenario', type: "relationLink" },
            { name: 'date', type: "date" },
            { name: 'place', type: "text" },
            { name: 'feedbackNotes', type: "text" },
            { name: 'personalNotes', type: "text" }
        ],
        categories: {
            Allgemein: [
                { name: "valid", type: "status" },
                { name: 'date', type: "date" },
                { name: 'place', type: "text" },
                { name: 'feedbackNotes', type: "text" },
                { name: 'personalNotes', type: "text" }
            ],
            Scenario:
                { name: "scenario", type: "list", entity: "scenarios" }
            ,
            TestPerson:
                { name: "testPerson", type: "list", entity: "testPersons" }
            ,
            QuestionAnswers:
                { name: "questionAnswers", type: "table", entity: "questionAnswers" }
            ,
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    },
    /**
     * TestPersons
     */
    testPersons: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'signature', type: "status" },
            { name: 'name', type: "text" },
            { name: 'gender', type: "gender" },
            { name: 'age', type: "number" }
        ],
        categories: {
            Allgemein: [
                { name: "signature", type: "status" },
                { name: "name", type: "text" },
                { name: 'gender', type: "gender" },
                { name: 'age', type: "number" }
            ],
            SurveyResponse:
                { name: "surveyResponse", type: "list", entity: "surveyResponses" }
            ,
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    },
    /**
     * Users
     */
    users: {
        listAttributes: [
            { name: 'id', type: "number" },
            { name: 'status', type: "status" },
            { name: 'name', type: "text" },
            { name: 'email', type: "email" },
            { name: 'roles', type: "text" }
        ],
        categories: {
            Allgemein: [
                { name: 'status', type: "status" },
                { name: "name", type: "text" },
                { name: 'email', type: "email" },
                { name: 'roles', type: "text" }
            ],
            Projects:
                { name: "projects", type: "table" }
            ,
            Admin: [
                { name: "id", type: "number" },
                { name: "createdAt", type: "date" },
                { name: "updatedAt", type: "date" }
            ],
        }
    }
}