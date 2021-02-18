<script>
    import H1 from "./typography/H1.svelte";

    export let title;
</script>

{#if title}
    <H1>{title}</H1>
{/if}
<div class="surfaceColor">
    <slot />
</div>

<style>
    div {
        border-width: 1px;
        border-color: #2e5bff;
        margin: 1em;
        border-radius: 12px;
    }
</style>
