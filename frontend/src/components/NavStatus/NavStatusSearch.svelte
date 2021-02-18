<script>
    import Icon from "../common/Icon.svelte";
    import { goto } from "@sapper/app";
    import { slide } from "svelte/transition";

    $: value = "";
    let shown = false;

    function check_key(ev) {
        if (ev.keyCode === 13) {
            execute_search();
        }
    }

    function changed() {
        // for fuzzy search
    }

    function clicked() {
        if (value.length === 0) {
            shown = !shown;
        } else {
            execute_search();
        }
    }

    function execute_search() {
        value = "";
    }
</script>

<button on:click={clicked}>
    <Icon title="search" />
</button>
{#if shown}
    <div>
        <input
            bind:value
            on:keyup={check_key}
            on:change={changed}
            type="text"
        />
    </div>
{/if}

<style>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        border: 2px solid rgb(170, 170, 170);
    }

    input {
        border: 1px dotted red;
        font-size: inherit;
        margin: 0;
        padding: 0;
    }

    button {
        background: transparent;
        border: none;
        width: 50px;
        height: 50px;
        margin: 0;
        padding: 0;
    }
</style>
