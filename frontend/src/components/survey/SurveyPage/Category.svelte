<script>
    import DropDownIcon from "../../common/DropDownIcon.svelte";
    import Question from "./Question.svelte";

    export let node;
    export let type = 0;

    let answeredQuestionsArray = [];

    $: console.log("bigbrain", answeredQuestionsArray);

    $: huso = answeredQuestionsArray.length;

    let expanded = false;

    function toggleExpanded() {
        expanded = !expanded;
    }
</script>

<div class="categoryContainer" on:click={toggleExpanded}>
    <div class="categoryCompact">
        <div class="dropDownIcon">
            <DropDownIcon bind:expanded />
        </div>
        <h3 class="title">
            {node.name}
            {huso}/{node.children.reduce((acc, item) => acc + (item.children === undefined ? 0 : item.children.length), 0)}
        </h3>
    </div>
    {#if expanded}
        <ul class="questions">
            {#each node.children as child}
                {#if child.children.length === 0}
                    <Question on:update_answer bind:answeredQuestionsArray {type} node={child} />
                {:else}
                    {#each child.children as childsQuestion}
                        <Question on:update_answer bind:answeredQuestionsArray {type} node={childsQuestion} />
                    {/each}
                {/if}
            {/each}
        </ul>
    {/if}
</div>

<style>
    .categoryContainer {
        box-shadow: 0 0 0.5em grey;
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        display: flex;
        flex-direction: column;
        z-index: 5;
    }
    .categoryCompact {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
    }
    .dropDownIcon {
        width: 28px;
        height: 28px;
    }
    .title {
        padding: 0px;
        margin: 0px;
        text-align: center;
        user-select: none;
    }
    .questions {
        z-index: 10;
    }
</style>
