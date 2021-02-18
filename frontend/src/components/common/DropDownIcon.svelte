<script>
    import Icon from "./Icon.svelte";

    export let expanded;
</script>

<div class="container">
    {#if expanded}
        <Icon title={"arrow_drop_up"} />
    {:else}
        <Icon title={"arrow_drop_down"} />
    {/if}
</div>

<style>
    .container {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }
</style>
