<script>
    import { createEventDispatcher } from "svelte";
    import ScorePicker from "../../common/ScorePicker/ScorePicker.svelte";
    import TextArea from "../../common/TextArea.svelte";

    const dispatch = createEventDispatcher();

    export let node;
    export let score;
    export let text;
    export let type = 0;
    export let answeredQuestionsArray = [];
    export let isSend;

    function shouldUpdate() {
        if (!answeredQuestionsArray.includes(node.id)) {
            answeredQuestionsArray = [...answeredQuestionsArray, node.id];
        }
        console.log(answeredQuestionsArray);
        dispatch("update_answer", { id: node.id, text, score });
    }
</script>

<li on:click|stopPropagation class="questionContainer">
    <h4 class="questionName">{node.name}</h4>
    <p class="questionDescription">{node.description}</p>

    {#if type === 0 || type === 1}
        <div class="questionScore">
            <ScorePicker bind:locked={isSend} on:changed={shouldUpdate} bind:score />
        </div>
    {/if}
    {#if type === 0 || type === 2}
        <div class="questionText">
            <TextArea placeholder="Ihre Meinung..." bind:locked={isSend} on:changed={shouldUpdate} bind:value={text} />
        </div>
    {/if}
</li>

<style>
    .questionContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-items: center;
        align-content: center;
        align-items: center;
        box-shadow: 0 0 1em grey;
        padding: 0.5rem;
        margin-bottom: 1rem;
    }
    .questionName {
        text-align: center;
        width: 100%;
        font-weight: 500;
    }
    .questionDescription {
        text-align: center;
        width: 100%;
    }
    .questionScore {
        width: 80%;
        padding-bottom: 0.5rem;
    }
    .questionText {
        width: 100%;
    }
</style>
