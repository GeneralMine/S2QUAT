<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/
    import EntityView from "../../components/entities/EntityView.svelte";
    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import { onMount, onDestroy } from "svelte";
    import Surface from "../../components/common/Surface.svelte";
    import EntityModels from "../../lib/entityModels";
    import EntityDetails from "../../components/entities/EntityDetails.svelte";

    let entity = "employees";
    let { categories } = EntityModels[entity];
</script>

<svelte:head>
    <title>{capitalizeFirstLetter(entity)} - S2QUAT</title>
</svelte:head>

<div class="page">
    <EntityDetails {entity} {categories} isEditMode={true} entityObject={null} isNew={true} />
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
    }
</style>
