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
    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import { onMount, onDestroy } from "svelte";
    import EntityModels from "../../lib/entityModels";

    export let id;

    let entity = "actions";
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
    <EntityDetails {entity} {entityObject} {categories} on:update={reloadData} />
</div>
