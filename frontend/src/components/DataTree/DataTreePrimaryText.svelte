<script>
    import TextField from "../common/TextField.svelte";

    export let text;
    export let isEditMode;
</script>

{#if isEditMode}
    <div class="container textField text">
        <TextField type="text" color="white" bind:value={text} placeholder="Your title here..." />
    </div>
{:else}
    <p class="container text">
        {text}
    </p>
{/if}

<style>
    .container {
        margin: 0.2em;
        padding: 0.2em;
    }
    .text {
        font-size: 18px;
        font-weight: bold;
    }
    .textField {
        width: 550px;
    }
</style>
