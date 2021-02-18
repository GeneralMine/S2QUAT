<script>
    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import Surface from "../common/Surface.svelte";
    import EntityAttributeList from "./components/EntityAttributeList.svelte";
    export let entity;
    export let entityObject;
    export let categories;
    export let isNew = false;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function dispatchUpdate() {
        dispatch("update", {
            text: "update",
        });
    }
</script>

{#if entityObject !== undefined}
    <Surface title={capitalizeFirstLetter(entity) + " Details"}>
        <EntityAttributeList {entity} {entityObject} {categories} {isNew} on:update={dispatchUpdate} />
    </Surface>
{/if}
