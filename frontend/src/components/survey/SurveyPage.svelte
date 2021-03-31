<script>
    import Category from "./SurveyPage/Category.svelte";
    import { createNode } from "../../lib/treeLib";

    export let rootQuestion;
    export let questionsMap;
    export let type = 0;
</script>

<div class="">
    <h2>{rootQuestion.name}</h2>
    <p>{rootQuestion.description}</p>
    {#if questionsMap[rootQuestion.id] !== undefined}
        {#each questionsMap[rootQuestion.id] as category}
            <Category on:update_answer {type} node={createNode(category, questionsMap)} />
        {/each}
    {/if}
</div>
