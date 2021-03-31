<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let number;
    export let score;

    function updateScore() {
        if (score === number) {
            score = undefined;
        } else score = number;

        dispatch("changed", score);
    }
</script>

<div class="scorePickerItemContainer" class:selected={number === score} on:click={updateScore}>
    {number}
</div>

<style>
    .scorePickerItemContainer {
        user-select: none;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .selected {
        background-color: greenyellow;
    }
</style>
