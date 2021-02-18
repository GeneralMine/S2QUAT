<script>
    import TextArea from "../common/TextArea.svelte";
    export let text;
    export let isEditMode;
</script>

{#if isEditMode}
    <div class="container text">
        <TextArea type="text" color="white" bind:value={text} placeholder="Your description here..." />
    </div>
{:else}
    <p class="container text">{text}</p>
{/if}

<style>
    .container {
        margin: 0.2em;
        padding: 0.2em;
        height: 100%;
        width: 100%;
        display: flex;
    }
    .text {
        font-size: 14px;
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>
