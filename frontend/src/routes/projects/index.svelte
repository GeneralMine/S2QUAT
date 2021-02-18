<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/
    import EntityView from "../../components/entities/EntityView.svelte";
    import CardRow from "../../components/Cards/CardRow.svelte";
    import NumberCard from "../../components/Cards/NumberCard.svelte";
    import PieCard from "../../components/Cards/PieCard.svelte";
    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import cardFunctions from "../../lib/cardFunctions";
    import { onMount, onDestroy } from "svelte";
    import EntityModels from "../../lib/entityModels";

    let entity = "projects";
    let entities = [];
    let { listAttributes } = EntityModels[entity];

    onMount(async () => {
        await reloadData();
    });

    async function reloadData() {
        const url = BACKEND_URL + "/" + entity;
        entities = await (await getData(url)).json();
        console.log("Loaded:", entities);
    }
</script>

<svelte:head>
    <title>{capitalizeFirstLetter(entity)} - S2QUAT</title>
</svelte:head>

<div class="page">
    <CardRow>
        <NumberCard title="Anzahl" value={entities.length} icon="amount" />
        <NumberCard title="Szenarien" value={cardFunctions.sumOfKeyElements(entities, "scenarios")} icon="scenarios" />
        <PieCard title="Szenarienverteilung" data={Object.values(cardFunctions.countBy(entities, "scenarios"))} labels={Object.keys(cardFunctions.countBy(entities, "scenarios"))} icon="scenarios" />
    </CardRow>
    <EntityView {entity} {entities} entitiesAttributes={listAttributes} on:update={reloadData} />
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
    }
</style>
