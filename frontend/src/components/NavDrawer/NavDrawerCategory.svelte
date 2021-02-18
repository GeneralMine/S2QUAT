<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    export let title;
    let triggered = true;
</script>

<div class="container">
    <div transition:fly class="category" on:click={() => (triggered = !triggered)}>
        <div class="item">
            <img class="icon" src={"icons/" + title + ".svg"} alt="{title} icon" />
            <h3>{title}</h3>
        </div>
        <img class="arrow" class:arrow_up={triggered} class:arrow_down={!triggered} src={"icons/arrow_down.svg"} alt="arrow" />
    </div>

    {#if triggered}
        <div id="children" transition:fly={{ x: -200, duration: 300, easing: quintOut }}>
            <slot />
        </div>
    {/if}
</div>

<style>
    h3 {
        user-select: none;
        margin: 0;
        padding: 0;
    }

    .category {
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
    }

    .item {
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .arrow {
        display: flex;
    }

    #children {
        user-select: none;
    }

    img {
        scale: 0.9;
    }

    .icon {
        object-fit: fill;
    }

    .arrow_up {
        transform: rotate(180deg);
    }

    .arrow_down {
        transform: rotate(0deg);
    }

    .container {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
    }

    /* .triggered {
        padding-left: 17px;
    } */
</style>
