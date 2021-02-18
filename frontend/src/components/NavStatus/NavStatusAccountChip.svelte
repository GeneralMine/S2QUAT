<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    import DropDownIcon from "../common/DropDownIcon.svelte";
    import Icon from "../common/Icon.svelte";

    import Logout from "./Logout.svelte";
    import { slide } from "svelte/transition";

    const { session } = stores();
    $: user = $session.user;
    /*******************************************/

    $: expanded = false;

    function expandedHandler() {
        expanded = !expanded;
    }
</script>

{#if user !== null}
    <div class="container" on:click={expandedHandler}>
        <div class="profileImageContainer">
            <Icon title="account_circle" />
        </div>

        <div class="textContainer">
            <p class="text">{user != null ? user.name : "Placeholder"}</p>
        </div>

        <div class="dropdownContainer">
            <DropDownIcon {expanded} />
        </div>
    </div>
{/if}

{#if expanded}
    <div class="dropdown" transition:slide={{ y: -100, duration: 200 }}>
        <Logout />
    </div>
{/if}

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 10px;
        /* padding: 0.4em; */

        border-radius: 25px;
        border: 2px solid #707070;
        flex-direction: row;
        user-select: none;
    }

    .profileImageContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0;
    }

    .textContainer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .text {
        margin: 0;
        padding: 0;
    }

    .dropdownContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: inherit;
        width: 30px;
        height: 30px;
    }

    .dropdown {
        position: absolute;
        background-color: #f9f9f9;
        display: flex;
        flex-direction: column;
        min-width: 100px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 12px 16px;
        z-index: 1;
    }
</style>
