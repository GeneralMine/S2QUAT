<script>
    import { slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    export let extended;
    export let indented = true;
</script>

<div>
    {#if extended}
        <ul class="dataTreeList" class:indented transition:slide={{ delay: 0, duration: 300, easing: quintOut }}>
            <slot />
        </ul>
    {/if}
</div>

<style>
    .dataTreeList {
        padding: 1em;
        margin: 0;
    }
    .indented {
        padding-left: 3em;
    }
</style>
