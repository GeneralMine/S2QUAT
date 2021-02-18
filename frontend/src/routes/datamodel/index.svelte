<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/
    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import { onMount, onDestroy } from "svelte";
    import DataModel from "../../components/DataModel/DataModel.svelte";
    import { remodel, createNode } from "../../lib/treeLib";
    let questions = [];
    let entitiesMap = [];

    onMount(async () => {
        const url = BACKEND_URL + "/questions";
        questions = await (await getData(url)).json();
        console.log("Loaded:", questions);
        entitiesMap = remodel(questions);
        console.log(entitiesMap);
    });
</script>

<svelte:head>
    <title>DataModel - S2QUAT</title>
</svelte:head>

<div class="page">
    <DataModel {entitiesMap} />
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
    }
</style>
