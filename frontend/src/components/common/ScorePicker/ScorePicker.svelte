<script>
    import { range } from "../../../lib/range";
    import ScorePickerItem from "./ScorePickerItem.svelte";

    let min = 1;
    let max = 5;

    export let score;
    export let locked = false;
</script>

<div class="scorePickerContainer">
    <div class="items">
        {#each range(min, max + 1) as number}
            <div class="scorePickerItem" style="width: {100 / (max - min)}%">
                <ScorePickerItem on:changed {number} bind:locked bind:score />
            </div>
        {/each}
    </div>
    <div class="hint">
        <div>trifft nicht zu</div>
        <div>trifft zu</div>
    </div>
</div>

<style>
    .scorePickerContainer {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 4rem;
    }
    .items {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 3rem;
    }
    .hint {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 1rem;
        width: 100%;
    }
</style>
