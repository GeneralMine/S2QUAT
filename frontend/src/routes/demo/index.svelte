<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/

    import AnalyticsPage from "../../components/survey/AnalyticsPage.svelte";
    import SelectionPage from "../../components/survey/SelectionPage.svelte";
    import ScenarioPage from "../../components/survey/ScenarioPage.svelte";
    import SurveyPage from "../../components/survey/SurveyPage.svelte";
    import Button from "../../components/common/Button.svelte";

    import { onMount } from "svelte";
    import { remodel, createNode } from "../../lib/treeLib";
    import { postData, getData, capitalizeFirstLetter } from "../../lib";

    let questions = [];
    let questionsMap = {};

    onMount(async () => {
        const url = BACKEND_URL + "/questions";
        console.log("Requesting:", url);
        questions = await (await getData(url)).json();
        console.log("Loaded:", questions);
        questionsMap = remodel(questions);
        console.log(questionsMap);
    });

    // Startpage with Info Text and Images
    // Selection Page
    // Answerpage
    // ModelView with clickable fields
    // SurveyView field specific pages
    // button to get back to modelView
    // second layer expandable tab
    // thirdLayer.children.length === 1 ? thirdLayer.children[0] : thirdLayer.children (as group of fourth dimension)
    // rating from 1 to 5 (disagree to agree)
    // Analytics
    // mean score of field
    // tbd

    /*
    Pages
    - ScenarioPage (Info about the scenario, later with TestPerson creation)
    - SelectionPage (Select fields or scenarios, later not used)
    - SurveyPage
        - ModelView
        - SurveyView
    - AnalyticsPage
        - ModelView
            - Traffic Light Colors for every field
    */

    /*
    0 -> ScenarioPage
    1 -> SelectionPage
    2 -> SurveyPage
    3 -> AnalyticsPage
    */
    let page_index = 2;
    let max_index = 3;

    function back() {
        if (--page_index < 0) {
            page_index = 0;
        }
    }
    function forward() {
        if (++page_index > 3) {
            page_index = max_index;
        }
    }
</script>

<svelte:head>
    <title>Demo - S2QUAT</title>
</svelte:head>

{#if page_index === 0}
    <ScenarioPage />
{:else if page_index === 1}
    <SelectionPage />
{:else if page_index === 2}
    <SurveyPage {questions} {questionsMap} />
{:else if page_index === 3}
    <AnalyticsPage />
{/if}

<div id="button_group">
    <Button active={page_index > 0} on:click={back} title="Zurück" />
    <Button active={page_index < max_index} on:click={forward} title="Weiter" />
</div>

<style>
</style>
