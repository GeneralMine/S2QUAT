<script context="module">
    export function preload({ params }, session) {
        return { id: params.id };
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
    import { postData, getData, capitalizeFirstLetter } from "../../../lib";
    import SendPage from "../../../components/survey/SendPage.svelte";
    import SurveyPage from "../../../components/survey/SurveyPage.svelte";
    import Footer from "../../../components/common/Footer.svelte";
    import { loadModel, loadScenario, storeModel, storeScenario } from "../../../components/survey/stored_surveys";
    import { onMount, onDestroy } from "svelte";

    import { remodel, createNode } from "../../../lib/treeLib";
    import PageViewIndicator from "../../../components/Navigation/PageViewIndicator.svelte";
    export let id;

    /*

    /scenarios/id/survey

    1. Vom Scenario, dessen Model, dessen questions

    Nur Fragebögen sind offline gespeichert!

    0 -> ScenarioPage: Scenrio wird erklärt und so
    0 < x < max -> jedes Feld (1.L) bekommt eigene Seite
    max -> SendPage: Fragen zur Person (TestPerson creation)
    
    */

    // SurveyData
    let questionAnswers = [];
    let name;
    let age;
    let gender;
    let signature = false;

    // functionalitiy
    let page_index = 0;
    let max_index = 2;

    // Data
    let scenario;
    let model = [];
    let questionsMap = [];

    onMount(async () => {
        try {
            model = loadModel(id);
            scenario = loadScenario(id);
        } catch (err) {
            const scenarioURL = BACKEND_URL + "/scenarios/" + id;
            scenario = await (await getData(scenarioURL)).json();

            const modelURL = BACKEND_URL + "/models/" + scenario.model.id;
            model = await (await getData(modelURL)).json();

            questionsMap = remodel(model.questions);

            console.log(questionsMap, model.questions);

            console.log("Loaded Scenario", scenario);
            console.log("Loaded Model", model);
            console.log("Loaded questionsMap", questionsMap);

            if (questionsMap[null] !== undefined && Array.isArray(questionsMap[null])) {
                max_index += questionsMap[null].length;
            }
        }
    });

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
        console.log("Sending form...", { questionAnswers, name, age, gender, signature });
    }
</script>

<div class="surveyContainer">
    <div class="surface surfaceColor">
        <div class="content">
            {#if page_index === 0}
                <ScenarioPage title={scenario !== undefined ? scenario.name : "Test"} description={scenario !== undefined ? scenario.description : "Test"} />
            {:else if page_index === max_index - 1}
                <SendPage bind:name bind:age bind:gender bind:signature />
            {:else if questionsMap !== undefined}
                {#each questionsMap[null] as rootQuestion, index}
                    {#if page_index === index + 1}
                        <SurveyPage bind:questionAnswers {rootQuestion} {questionsMap} number={index} />
                    {/if}
                {/each}
            {:else}
                <p>This shouldnt have happend... sorry...</p>
            {/if}
        </div>

        <div class="button_group">
            <Button active={page_index > 0} on:click={back} title="Zurück" />
            <PageViewIndicator bind:count={max_index} bind:selected={page_index} />
            <Button active={page_index < max_index - 1 || signature} on:click={forward} title={signature && page_index === max_index - 1 ? "Send" : "Weiter"} />
        </div>
    </div>
    <Footer />
</div>

<style>
    .surveyContainer {
        height: 100vh;
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
        height: 75%;

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
