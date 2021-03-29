<script>
    export let number;
    export let questionAnswers;
    export let rootQuestion;
    export let questionsMap;
</script>

<div class="">
    <!-- {number}
    {JSON.stringify(rootQuestion, null, 4)}
    {questionsMap} -->

    {#if questionsMap[rootQuestion.id] !== undefined}
        {#each questionsMap[rootQuestion.id] as category}
            {category.name}
            {#each questionsMap[category.id] as question}
                {question.name}
            {/each}
        {/each}
    {/if}
</div>
