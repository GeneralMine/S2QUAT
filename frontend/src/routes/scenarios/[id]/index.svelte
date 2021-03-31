<script context="module">
    export async function preload({ params }, session) {
        return { id: params.id };
    }
</script>

<script>
    /********************************************
     * Gettieng denv variables from session store */
    import { stores, goto } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/
    import EntityDetails from "../../../components/entities/EntityDetails.svelte";
    import CardRow from "../../../components/Cards/CardRow.svelte";
    import NumberCard from "../../../components/Cards/NumberCard.svelte";
    import PieCard from "../../../components/Cards/PieCard.svelte";
    import { postData, getData, capitalizeFirstLetter } from "../../../lib";
    import cardFunctions from "../../../lib/cardFunctions";
    import { onMount, onDestroy } from "svelte";
    import EntityModels from "../../../lib/entityModels";
    import Button from "../../../components/common/Button.svelte";

    export let id;
    let entity = "scenarios";
    let entityObject;
    let { categories } = EntityModels[entity];

    onMount(async () => {
        await reloadData();
    });

    async function reloadData() {
        const url = BACKEND_URL + "/" + entity + "/" + id;
        console.log("Get details with", url);
        entityObject = await (await getData(url)).json();
        console.log("Loaded:", entityObject);
    }

    async function conductSurvey() {
        console.log("Conducting a survey for id", id);
        goto("/" + entity + "/" + id + "/survey", { replaceState: true });
    }
</script>

<svelte:head>
    <title>{capitalizeFirstLetter(entity)} - S2QUAT</title>
</svelte:head>

<div>
    <CardRow>
        <NumberCard title="SurveyResponses" value={cardFunctions.lengthOfKey(entityObject, "surveyResponses")} icon="surveyResponses" />
        <NumberCard title="Score" value={0} icon="questionAnswers" />
    </CardRow>
    <EntityDetails {entity} {entityObject} {categories} on:update={reloadData} />
    <Button title="Conduct a survey" on:click={conductSurvey} />
</div>
