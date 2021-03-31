<script>
    import { range } from "../../../lib/range";
    import ScorePickerItem from "./ScorePickerItem.svelte";

    let min = 1;
    let max = 5;

    export let score;
</script>

<div class="scorePickerContainer">
    {#each range(min, max + 1) as number}
        <div class="scorePickerItem" style="width: {100 / (max - min)}%">
            <ScorePickerItem on:changed {number} bind:score />
        </div>
    {/each}
</div>

<style>
    .scorePickerContainer {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
</style>
