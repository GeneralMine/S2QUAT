<script>
    export let count;
    export let selected; //for binding
    import { range } from "../../lib/range";
    import PageViewIndicatorBubble from "./PageViewIndicatorBubble.svelte";

    $: console.log(selected);
</script>

<div class="pageViewIndicatorContainer">
    {#each range(count) as i}
        <div
            class="pageViewIndicatorBubble"
            on:click={() => {
                selected = i;
            }}
        >
            <PageViewIndicatorBubble selected={i === selected} />
        </div>
    {/each}
</div>

<style>
    .pageViewIndicatorContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
