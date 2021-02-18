<script>
    import DataTreeList from "../../DataTree/DataTreeList.svelte";
    import DataTreeAdd from "../../DataTree/DataTreeAdd.svelte";
    import { remodel, createNode } from "../../../lib/treeLib";
    import DataTree from "../../DataTree/DataTree.svelte";
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let entities = [];
    export let selection = [];
    export let isEditable = false;
    export let isSelectionMode = false;

    const colors = ["9,176,56", "9,186,110", "9,164,186", "9,111,176"];

    let entitiesMap = {};
    let selectedID;

    $: console.log("selectedNodes", selection);
    $: dispatchSelectionChanged(selection);

    onMount(async () => {
        await reloadData();
    });

    function dispatchSelectionChanged(sel) {
        dispatch("selectionChanged", sel);
    }

    async function reloadData() {
        console.log("Data got", entities);
        entitiesMap = remodel(entities);
        console.log("remodeled", entitiesMap);
    }

    function onSelect(ev) {
        selectedID = ev.detail.id;
    }

    function selectionChanged(ev) {
        if (!isSelectionMode) return;
        const { s, id } = ev.detail;
        console.log("CALLED", { s, id });

        if (s) {
            if (!selection.includes(id)) {
                selection = [...selection, id];
            }
        } else {
            selection = selection.filter((el) => el !== id);
        }
    }
</script>

<div>
    <DataTreeList on:update={reloadData} extended={true} indented={false}>
        {#if Array.isArray(entitiesMap[null])}
            {#each entitiesMap[null] as root}
                <DataTree
                    on:update={reloadData}
                    on:select={onSelect}
                    on:selectionChange={selectionChanged}
                    node={createNode(root, entitiesMap)}
                    extended={false}
                    depth={0}
                    {isEditable}
                    {isSelectionMode}
                    {selection}
                    {selectedID}
                    {entitiesMap}
                    {colors}
                />
                {#if isEditable && !isSelectionMode}
                    <DataTreeAdd on:update={reloadData} id={root.id} parent={root.parent != null ? root.parent.id : null} depth={0} {colors} />
                {/if}
            {/each}
        {/if}
    </DataTreeList>
</div>
