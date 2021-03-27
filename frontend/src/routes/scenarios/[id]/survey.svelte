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
    import AnalyticsPage from "../../../components/survey/AnalyticsPage.svelte";
    import ScenarioPage from "../../../components/survey/ScenarioPage.svelte";
    import SelectionPage from "../../../components/survey/SelectionPage.svelte";
    import SurveyPage from "../../../components/survey/SurveyPage.svelte";

    export let id;
    /*

    /scenarios/id/survey

    1. Vom Scenario, dessen Model, dessen questions

    Nur Fragebögen sind offline gespeichert!

    0 -> ScenarioPage
    1 -> SelectionPage
    2 -> SurveyPage
    3 -> AnalyticsPage
    
    
    
    
    
    */
    let page_index = 2;
    let max_index = 3;
    let entity = "scenarios";
    let entityObject;

    onMount(async () => {
        await reloadData();
    });

    async function reloadData() {
        const url = BACKEND_URL + "/" + entity + "/" + id;
        console.log("Get details with", url);
        entityObject = await (await getData(url)).json();
        console.log("Loaded:", entityObject);
    }

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

<Button title={id} />

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
