<script context="module">
    export async function preload({ params }, session) {
        if (params !== undefined) {
            return { id: params.id };
        }
    }
</script>

<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/
    import EntityDetails from "../../components/entities/EntityDetails.svelte";
    import CardRow from "../../components/Cards/CardRow.svelte";
    import NumberCard from "../../components/Cards/NumberCard.svelte";
    import PieCard from "../../components/Cards/PieCard.svelte";
    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import cardFunctions from "../../lib/cardFunctions";
    import { onMount, onDestroy } from "svelte";
    import EntityModels from "../../lib/entityModels";

    export let id;
    let entity = "projects";
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
</script>

<svelte:head>
    <title>{capitalizeFirstLetter(entity)} - S2QUAT</title>
</svelte:head>

<div>
    <CardRow>
        <NumberCard title="Scenarios" value={cardFunctions.lengthOfKey(entityObject, "scenarios")} icon="scenarios" />
        <NumberCard title="Bearbeiter" value={cardFunctions.lengthOfKey(entityObject, "users")} icon="users" />
    </CardRow>
    <EntityDetails {entity} {entityObject} {categories} on:update={reloadData} />
</div>
