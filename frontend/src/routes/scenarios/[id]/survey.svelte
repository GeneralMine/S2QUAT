<script context="module">
    import { loadModel, loadScenario, storeModel, storeScenario } from "../../../components/survey/stored_surveys";

    export async function preload({ params }, session) {
        const BACKEND_URL = session.BACKEND_URL;
        const id = params.id;

        const cool_fetch = async (my_url) => (await getDataInPreload(this, my_url)).json();

        let model, scenario, questionsMap, max_index;

        try {
            if (typeof window === "undefined") {
                throw new Error("Caching only on client-side");
            }
            model = loadModel(id);
            scenario = loadScenario(id);
        } catch (err) {
            const scenarioURL = BACKEND_URL + "/scenarios/" + id;

            scenario = await cool_fetch(scenarioURL);

            const modelURL = BACKEND_URL + "/models/" + scenario.model.id;

            model = await cool_fetch(modelURL);

            questionsMap = remodel(model.questions);

            if (questionsMap[null] !== undefined && Array.isArray(questionsMap[null])) {
                max_index = 2 + questionsMap[null].length;
            }
        }

        return { /* id, */ model, scenario, max_index, questionsMap };
    }

    async function getDataInPreload(instance, url) {
        let response = await instance.fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });

        return response;
    }
</script>

<script>
    /********************************************
     * Gettieng denv variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/
    import Button from "../../../components/common/Button.svelte";
    import ScenarioPage from "../../../components/survey/ScenarioPage.svelte";
    import SendPage from "../../../components/survey/SendPage.svelte";
    import SurveyPage from "../../../components/survey/SurveyPage.svelte";
    import Footer from "../../../components/common/Footer.svelte";
    import { remodel, createNode } from "../../../lib/treeLib";
    import PageViewIndicator from "../../../components/Navigation/PageViewIndicator.svelte";
    import { postData, getData, capitalizeFirstLetter } from "../../../lib";

    import { questionAnswers } from "../../../components/survey/SurveyPage/question_answer";

    // functionalitiy
    let page_index = 0;
    export let max_index = 2;
    let isSend = false;
    let surveyResponseId;

    // data from Database
    export let scenario;
    export let model = [];
    export let questionsMap = {};

    // data to submit
    /**
     * map {
     *   categoryId: {
     *     questionId: {score, text}
     *   }
     * }
     */
    let name;
    let age;
    let gender;
    let signature = false;

    $: console.log(questionAnswers);

    function back() {
        if (--page_index < 0) {
            page_index = 0;
        }
    }
    function forward() {
        if (++page_index > max_index - 1) {
            if (signature) {
                sendSurvey();
            }
            page_index = max_index - 1;
        }
    }
    async function sendSurvey() {
        let url = BACKEND_URL + "/surveys";
        let data = { questionAnswers: $questionAnswers, name, age, gender, signature, scenarioId: scenario.id };
        console.log("Sending form to " + url, data);
        let response = await (await postData(url, data)).json();
        console.log(response);
        surveyResponseId = response.id;
        console.log("Got surveyResponseId", surveyResponseId);
        isSend = true;
    }

    function updateAnswer(ev) {
        // questionAnswers STORE
        const { id, text, score } = ev.detail;
        const tmp = { ...$questionAnswers };
        tmp[id] = { text, score };

        $questionAnswers = tmp;
    }
</script>

<div class="surveyContainer">
    <div class="surface surfaceColor">
        <div class="content">
            {#if page_index === 0}
                <ScenarioPage title={scenario !== undefined ? scenario.name : "Test"} description={scenario !== undefined ? scenario.description : "Test"} />
            {:else if page_index === max_index - 1}
                <SendPage bind:surveyResponseId bind:isSend bind:name bind:age bind:gender bind:signature />
            {:else if questionsMap !== undefined}
                {#each questionsMap[null] as rootQuestion, index}
                    {#if page_index === index + 1}
                        <SurveyPage bind:isSend on:update_answer={updateAnswer} type={model.type} {rootQuestion} {questionsMap} />
                    {/if}
                {/each}
            {:else}
                <p>This shouldnt have happend... sorry...</p>
            {/if}
        </div>

        <div class="button_group">
            <Button active={page_index > 0} on:click={back} title="Zurück" />
            <PageViewIndicator bind:count={max_index} bind:selected={page_index} />
            <Button active={page_index < max_index - 1 || (signature && !isSend)} on:click={forward} title={signature && page_index === max_index - 1 ? "Send" : "Weiter"} />
        </div>
    </div>
    <Footer />
</div>

<style>
    .surveyContainer {
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;
    }
    .surface {
        width: 770px;

        margin-top: 2rem;
        padding: 2rem;

        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-content: space-between;
        justify-content: space-between;

        border-width: 1px;
        border-color: #2e5bff;
        border-radius: 12px;
    }
    .content {
    }
    .button_group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }

    @media (max-width: 768px) {
        .surface {
            width: 100%;
            height: auto;
        }
    }
</style>
