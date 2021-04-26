<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let number;
    export let score;
    export let locked;

    function updateScore() {
        if (!locked) {
            if (score === number) {
                score = undefined;
            } else score = number;

            dispatch("changed", score);
        }
    }
</script>

<div class="scorePickerItemContainer" class:selected={number === score} on:click={updateScore}>
    <div class="text">
        {number}
    </div>
</div>

<style>
    .scorePickerItemContainer {
        user-select: none;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-content: center;
        text-align: center;
        vertical-align: middle;
        background-color: #f8f8f8;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
    }
    .selected {
        background-color: #2e5bff;
        color: white;
    }
</style>
