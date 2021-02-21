<script>
    import DropDownIcon from "../../common/DropDownIcon.svelte";

    export let title;
    export let extended = false;

    $: console.log(extended);
</script>

<div class="container">
    <div on:click={() => (extended = !extended)} class="box_dropdownIcon">
        <DropDownIcon bind:expanded={extended} />
    </div>
    <div class="box_title">
        <span>{title}</span>
    </div>
    {#if extended}
        <div class="box_content">
            <slot />
        </div>
    {/if}
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .box_dropdownIcon {
        width: 30px;
        height: 30px;
    }
    .box_title {
    }
    .box_content {
    }
</style>
