const questionAnswersController = require("./questionAnswers");
const surveyResponsesController = require("./surveyResponses")
const testPersonsController = require("./testPersons")

module.exports = {
    insert
}

/**
 * @param {number} userID 
 * @param {({gender?: string, name?: string, questionAnswers?: any, signature: boolean})} input
 * @returns {number}
 * 
 * 1. Map QuestionAnswers X
 * 2. Insert QuestionAnswers X
 * 3. Connect QuestionAnswers with Questions X
 * 4. Insert SurveyResponses X
 * 5. Insert TestPerson X
 * 6. Waiting for SurveyResponses and TestPerson X
 * 7. Connect SurveyResponse with TestPerson X
 * 8. Waiting for questions to complete X
 * 9. Connect SurveyResponse with QuestionAnswers
 * 10. Connect SurveyResponse with Scenario
 * 11. Waiting for SurveyResponse+TestPerson, SurveyResponse+QuestionAnswers, SurveyResponse+Scenario
 * 
 * return surId
 * 
 */
async function insert(userID, input) {
    let { age = "", gender = "", name = "", questionAnswers = {}, signature, scenarioId } = input;

    // 1. Map QuestionAnswers
    let questionAnswersArray = Object.keys(questionAnswers)
        .map(el => ({ questionId: el, score: questionAnswers[el].score, text: questionAnswers[el].text }));



    //2. Insert QuestionAnswers && 3. Connect QuestionAnswers with Questions
    let questionAnswersIds = [];
    questionAnswersArray.forEach(async el => {
        let newId = await questionAnswersController.insert(userID, { score: el.score, text: el.text });

        questionAnswersArray.push(newId);

        return await questionAnswersController.update(userID, newId, { questions: { question: el.questionId } });
    });

    // 4. Insert SurveyResponses
    let surveyResponsesControllerInsertPromise = surveyResponsesController.insert(userID, { valid: 1, date: new Date() });

    // 5. Insert TestPerson
    let testPersonControllerInsertPromise = testPersonsController.insert(userID, { name, signature, age, gender });

    // 6. Waiting for SurveyResponses and TestPerson
    console.log("6.")
    let surveyResponseId = await surveyResponsesControllerInsertPromise;
    let testPersonId = await testPersonControllerInsertPromise;

    // 7. Connect SurveyResponse with TestPerson
    console.log("7.")
    let connectSurveyResponseWithTestPersonPromise = surveyResponsesController.update(userID, surveyResponseId, { testPerson: { testPerson: testPersonId } });

    // 9. Connect SurveyResponse with QuestionAnswers
    let connectSurveyResponseWithQuestionsPromise = surveyResponsesController.update(userID, surveyResponseId, { questionAnswers: { questionAnswers: questionAnswersIds } });

    // 10
    console.log("10.")

    let connectSurveyResponseWithScenarioPromise = surveyResponsesController.update(userID, surveyResponseId, { scenario: { scenario: scenarioId } });

    // 11. Waiting for SurveyResponse+TestPerson and SurveyResponse+QuestionAnswers
    await connectSurveyResponseWithTestPersonPromise;
    await connectSurveyResponseWithScenarioPromise;
    await connectSurveyResponseWithQuestionsPromise;
    console.log("DONE.")

    return surveyResponseId;
}
