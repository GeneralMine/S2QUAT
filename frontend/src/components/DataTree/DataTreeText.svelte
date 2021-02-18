<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/
    import { postData, getData, capitalizeFirstLetter, deleteData } from "../../lib/index";
    import DataTreeSecondaryText from "./DataTreeSecondaryText.svelte";
    import DataTreePrimaryText from "./DataTreePrimaryText.svelte";
    import IconButton from "../common/IconButton.svelte";
    import Checkbox from "../common/Checkbox.svelte";
    import { createEventDispatcher } from "svelte";
    import Icon from "../common/Icon.svelte";
    export let id;
    export let name;
    export let description;
    export let parent;
    export let depth;
    export let isLast;
    export let extended;
    export let selected;
    export let isEditMode = false;
    export let isEditable = true;
    export let isSelectionMode = false;

    const dispatch = createEventDispatcher();

    $: dispatch("change", selected);

    async function toggle() {
        if (isEditMode) {
            let url = BACKEND_URL + "/questions/" + id;
            console.log("Update entry " + id + " at " + url);
            await postData(url, {
                id,
                name,
                description,
                parent: parent != null && typeof parent === "object" ? parent.id : parent,
                depth,
            });
            console.log("Successfully updated!");
            dispatch("update", {
                text: "update",
            });
        }
        isEditMode = !isEditMode;
    }
    async function deleteEntry() {
        // TODO Recursive Deletion of Children!!!
        let url = BACKEND_URL + "/questions/" + id;
        await deleteData(url);
        console.log("Successfully removed!");
        dispatch("update", {
            text: "update",
        });
    }

    function dispatchToggle() {
        if (!isEditMode) {
            dispatch("toggle", {
                text: "toggle",
            });
        }
    }
</script>

<div class="container">
    <div class="icon_pos">
        <div class="icon" on:click={dispatchToggle}>
            {#if isLast}
                {#if extended}
                    <Icon title="expand_less" />
                {:else}
                    <Icon title="expand_more" />
                {/if}
            {:else}
                <!-- <Icon title="last_page" /> -->
            {/if}
        </div>
        <div>
            {#if isSelectionMode && !isEditable}
                <Checkbox on:change bind:checked={selected} />
            {/if}
        </div>
    </div>
    <div
        class="textBox"
        on:click={() => {
            dispatchToggle();
            selected = !selected;
        }}
    >
        <div class="primaryText">
            <DataTreePrimaryText {isEditMode} bind:text={name} />
        </div>
        <div class="secondaryText">
            <DataTreeSecondaryText {isEditMode} bind:text={description} />
        </div>
    </div>
    {#if isEditable && !isSelectionMode}
        <div class="actions">
            <div class="actionButton">
                {#if isEditMode}
                    <IconButton title="Save" on:click={toggle} icon="check_circle" />
                {:else}
                    <IconButton title="edit" on:click={toggle} />
                {/if}
            </div>
            <div class="actionButton">
                <IconButton title="delete" on:click={deleteEntry} />
            </div>
        </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        user-select: none;
        width: 100%;
    }
    .textBox {
        display: flex;
        flex-direction: column;
        align-items: left;
        padding: 3;
        flex-grow: 1;
    }
    .icon_pos {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    /* .icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    } */
    .icon:hover {
        -webkit-transform: scale(1.2);
    }
    .primaryText {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .secondaryText {
        display: flex;
    }
    .actions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 25px;
        min-width: 25px;
        max-width: 25px;
        visibility: hidden;
        z-index: 5;
        padding-right: 1.5em;
        flex-shrink: 0;
    }
    .container:hover > .actions {
        visibility: visible;
    }
    .actionButton:hover {
        -webkit-transform: scale(1.2);
    }
</style>
