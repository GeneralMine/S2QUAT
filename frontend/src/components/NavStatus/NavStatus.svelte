<script>
    import NavStatusSearch from "./NavStatusSearch.svelte";
    import NavStatusAccountChip from "./NavStatusAccountChip.svelte";
    import NavStatusIcon from "./NavStatusIcon.svelte";
    import { postData, getData, capitalizeFirstLetter } from "../../lib";

    export let selected; // Icon
    $: title = capitalizeFirstLetter(selected);
    export let subtitle = "Subtitle";
</script>

<div class="container">
    <div class="leftFlex">
        <div class="statusIconContainer">
            <NavStatusIcon bind:selected />
        </div>
        <div class="textContainer">
            <h2 class="textTitle">{title}</h2>
            <h5 class="textSubtitle">{subtitle}</h5>
        </div>
    </div>

    <div class="searchContainer">
        <!-- <NavStatusSearch /> -->
    </div>

    <div class="rightFlex">
        <div class="accountChipContainer">
            <NavStatusAccountChip />
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        box-shadow: 0px 2px 0px 0px #e4e8f0;
        justify-content: space-between;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        height: 3.75rem;
        line-height: 1.15;
    }
    .leftFlex {
        display: flex;
        padding: 0;
        flex-direction: row;
        justify-content: flex-start;
    }
    .rightFlex {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .statusIconContainer {
        align-self: center; /* horizontal */
        justify-self: flex-start;
        padding-right: 1em;
    }
    .textContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: center;
        justify-self: flex-start;
    }
    .textTitle {
        padding: 0;
        margin: 0;
    }
    .textSubtitle {
        padding: 0;
        margin: 0;
    }
    .searchContainer {
        display: flex;
        height: 100%;
        margin: 0;
        padding: 0;
        justify-self: space-evenly;
    }
    .accountChipContainer {
        align-self: center; /* vertical */
        padding: 0.5em;
        justify-self: flex-end; /* horizontal */
    }
</style>
