<script>
    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import Surface from "../common/Surface.svelte";
    import EntityAttributeTable from "./components/EntityAttributeTable.svelte";
    export let entity;
    export let entities;
    export let entitiesAttributes;
    export let enableCreateButton;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function dispatchUpdate() {
        dispatch("update", {
            text: "update",
        });
    }
</script>

<Surface title={capitalizeFirstLetter(entity) + " List"}>
    <EntityAttributeTable {entity} {entities} {entitiesAttributes} {enableCreateButton} on:update={dispatchUpdate} />
</Surface>
