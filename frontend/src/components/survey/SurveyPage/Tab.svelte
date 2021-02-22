<!--
    ToDo: Finish Tab, redesign, extending level 2
-->
<script>
    import DropDownIcon from "../../common/DropDownIcon.svelte";

    export let title;
    export let extended = false;

    $: console.log(extended);
</script>

<div class="container">
    <div class="tabHeader">
        <div on:click={() => (extended = !extended)} class="box_dropdownIcon">
            <DropDownIcon bind:expanded={extended} />
        </div>
        <div class="box_title">
            <span>{title}</span>
        </div>
    </div>
    <div class="tabContent">
        {#if extended}
            <div class="box_content">
                <slot />
            </div>
        {/if}
    </div>
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .tabHeader {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    .tabContent {
        padding-left: 1em;
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
