<script>
    import DropDownIcon from "../../common/DropDownIcon.svelte";
    import Question from "./Question.svelte";

    export let node;
    export let type = 0;
    export let isSend;

    let answeredQuestionsArray = [];

    $: console.log("bigbrain", answeredQuestionsArray);

    $: arrayLength = answeredQuestionsArray.length;

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
            {arrayLength}/{node.children.reduce((acc, item) => acc + (item.children === undefined ? 1 : item.children.length), 0)}
        </h3>
    </div>
    {#if expanded}
        <p class="description">
            {node.description}
        </p>
        <ul class="questions">
            {#each node.children as child}
                {#if child.children.length === 0}
                    <Question bind:isSend on:update_answer bind:answeredQuestionsArray {type} node={child} />
                {:else}
                    {#each child.children as childsQuestion}
                        <Question bind:isSend on:update_answer bind:answeredQuestionsArray {type} node={childsQuestion} />
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
    .description {
        padding-left: 1rem;
    }
    .questions {
        z-index: 10;
        padding-left: 1rem;
        padding-right: 1rem;
    }
</style>
