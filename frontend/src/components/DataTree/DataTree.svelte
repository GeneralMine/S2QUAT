<script>
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
    import DataTreeList from "./DataTreeList.svelte";
    import DataTreeText from "./DataTreeText.svelte";
    import DataTreeAdd from "./DataTreeAdd.svelte";

    export let node;
    export let depth;
    export let colors;
    export let selection;
    export let selectedID;
    export let questionsMap;
    export let isEditable = true;
    export let isSelectionMode = false;

    export let extended;
    export let selected;

    $: isLast = node.children !== undefined && node.children.length > 0;

    function toggle() {
        if (node.children !== undefined && node.children.length > 0) {
            extended = !extended;
            selected = extended;
            if (!extended) {
                dispatch("select", {});
            } else {
                dispatch("select", { id: node.id });
            }
        }
    }
    /*
    green: 4caf50
    red: f44336
    blue: 2196f3
    yellow: ffeb3b
    */
    const dispatch = createEventDispatcher();

    function reloadData() {
        dispatch("update", {
            text: "update",
        });
    }

    onDestroy(() => {
        setSelected(node.id, false);
    });

    onMount(() => {
        selected = selection !== undefined ? selection.includes(node.id) : false;
        extended = selection !== undefined ? selection.includes(node.id) : false;
    });

    function checkboxAction(ev) {
        if (!isSelectionMode) return;
        console.log("selectionChange - please update");
        setSelected(node.id, ev.detail);
    }

    function setSelected(id, s) {
        dispatch("selectionChange", { id, s });
    }

    /**
     * Marvin mag docs sehr gerne :)
     *
     * @param {number} d depth
     * @param {boolean} select selected
     * @param {boolean} selectMode isSelectionMode
     */
    function shouldBeColor(d, select, selectMode) {
        if (selectMode && !select) {
            return false;
        }
        return depth === d;
    }
</script>

<div
    class:editableButNotSelected={isSelectionMode && !selected}
    class:col0={shouldBeColor(0, selected, isSelectionMode)}
    class:col1={shouldBeColor(1, selected, isSelectionMode)}
    class:col2={shouldBeColor(2, selected, isSelectionMode)}
    class:col3={shouldBeColor(3, selected, isSelectionMode)}
>
    <div>
        <DataTreeText on:change={checkboxAction} bind:selected bind:extended {...node} {isEditable} {isSelectionMode} on:update={reloadData} on:toggle={toggle} {isLast} />
    </div>
    <DataTreeList {extended}>
        {#each node.children as element}
            <svelte:self on:select on:selectionChange on:update={reloadData} node={element} depth={depth + 1} {isSelectionMode} {isEditable} {selectedID} {selection} {questionsMap} {colors} />
            {#if isEditable && !isSelectionMode}
                <DataTreeAdd on:update={reloadData} id={element.id} parent={element.parent != null ? element.parent.id : null} depth={depth + 1} {colors} />
            {/if}
        {/each}
    </DataTreeList>
</div>

<style>
    .editableButNotSelected {
        background-color: rgb(204, 204, 204);
    }

    .col0 {
        background-color: rgba(9, 176, 56, 0.2);
    }
    .col1 {
        background-color: rgba(9, 186, 110, 0.2);
    }
    .col2 {
        background-color: rgba(9, 164, 186, 0.2);
    }
    .col3 {
        background-color: rgba(9, 111, 176, 0.2);
    }
</style>
