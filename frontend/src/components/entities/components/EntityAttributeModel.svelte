<script>
    import { remodel, createNode } from "../../../lib/treeLib";
    import DataModel from "../../DataModel/DataModel.svelte";
    export let entities;
</script>

model here...
<div>
    <DataModel entitiesMap={remodel(entities)} />
</div>

<style>
</style>
