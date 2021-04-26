<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/

    import { postData, getData, deleteData, capitalizeFirstLetter, parseSingular, parsePlural } from "../../../lib";
    import IconButton from "../../common/IconButton.svelte";
    import Checkbox from "../../common/Checkbox.svelte";
    import SearchBar from "../../common/SearchBar.svelte";
    import Button from "../../common/Button.svelte";
    import DropDownButton from "../../common/DropDownButton.svelte";
    import { goto } from "@sapper/app";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let entity;
    export let entities;
    export let entitiesAttributes;
    export let enableCreateButton = true;
    export let search;
    export let forSelection = false;

    export let selection = [];
    $: anyChecked = selection.length > 0;

    $: console.log("selection is", selection);
    $: dispatchSelectionChanged(selection);

    function createButtonPressed(entity) {
        goto(entity + "/new");
    }

    async function deleteEntry(id) {
        let url = BACKEND_URL + "/" + entity + "/" + id;
        await deleteData(url);
        console.log("Successfully removed!");
        dispatch("update", {
            text: "update",
        });
    }

    function dispatchSelectionChanged(sel) {
        dispatch("selectionChanged", sel);
    }
</script>

<div class="tableContainer">
    <div class="tableOptions">
        <div class="tableOptionsFilter">
            <DropDownButton title="filter" />
        </div>
        <div class="tableOptionsSearch">
            <SearchBar {search} />
        </div>
        <div class="tableOptionsCreate">
            {#if enableCreateButton}
                <Button title={"Create " + capitalizeFirstLetter(parseSingular(entity))} on:click={createButtonPressed(entity)} />
            {/if}
        </div>
    </div>
    <table class="table" cellspacing="0" cellpadding="0">
        <thead>
            <tr style="cursor: pointer;">
                <th class="w-16">
                    <Checkbox
                        bind:checked={anyChecked}
                        bind:selection
                        on:change={(ev) => {
                            const ch = ev.detail;
                            if (ch) {
                                selection = [...entities].map((el) => el.id);
                            } else {
                                selection = [];
                            }
                        }}
                    />
                </th>
                {#each entitiesAttributes as attribute}
                    <th class="text-left">
                        {capitalizeFirstLetter(attribute.name)}
                    </th>
                {/each}
                <th class="selectionRun">
                    <!-- {#if forSelection}
                        <Button title="Select" on:click={selectionButtonPressed} />
                    {/if} -->
                </th>
            </tr>
        </thead>
        <tbody>
            {#if entities !== null && entities !== undefined && Array.isArray(entities)}
                {#each entities as item}
                    <tr>
                        <td class="w-16">
                            <Checkbox
                                id={item.id}
                                checked={false}
                                bind:selection
                                on:change={(ev) => {
                                    const ch = ev.detail;
                                    if (ch) {
                                        if (!selection.includes(item.id)) {
                                            selection = [...selection, item.id];
                                        }
                                    } else {
                                        selection = selection.filter((el) => el !== item.id);
                                    }
                                }}
                            />
                        </td>
                        {#each entitiesAttributes as attribute}
                            <td style="cursor: pointer;" onclick="window.location='{entity + '/' + item.id}';">
                                {#if attribute.type === "img" || attribute.type === "table"}
                                    <p class="text-left">
                                        <img style="height: 25px; width: auto;object-fit: contain;" src={"entityFiles/" + attribute.name + "s/" + item[attribute.name]} alt={item[attribute.name]} />
                                    </p>
                                {:else if attribute.type === "relationLink" && item[attribute.name] !== null}
                                    <a href={parsePlural(attribute.name) + "/" + item[attribute.name].id}>{attribute.name + item[attribute.name].id}</a>
                                {:else if attribute.type === "relationName" && item[attribute.name] !== null}
                                    <p>{item[attribute.name] !== undefined ? item[attribute.name].name : "-"}</p>
                                {:else if attribute.type === "relationLogo" && item[attribute.name] !== null}
                                    <p class="text-left">
                                        <img style="height: 25px; width: auto;object-fit: contain;" src={"entityFiles/logos/" + item[attribute.name].logo} alt={item[attribute.name].name} />
                                    </p>
                                {:else}
                                    <div>
                                        <span style="white-space: nowrap;"
                                            >{Array.isArray(item[attribute.name])
                                                ? item[attribute.name].length
                                                : typeof item[attribute.name] === "object" && item[attribute.name] != null
                                                ? item[attribute.name].name
                                                : item[attribute.name] == null
                                                ? "-"
                                                : item[attribute.name]}</span
                                        >
                                    </div>
                                {/if}
                            </td>
                        {/each}
                        <td class="td-fit text-right">
                            <div class="items-center inline-flex itemButtons">
                                <div class="itemButton">
                                    <IconButton icon="view" />
                                </div>
                                <div class="itemButton">
                                    <IconButton icon="delete" on:click={deleteEntry(item.id)} />
                                </div>
                            </div>
                        </td>
                    </tr>
                {/each}
            {:else}empty{/if}
        </tbody>
    </table>
</div>

<style>
    .tableContainer {
        display: flex;
        flex-direction: column;
        overflow-x: auto;
        overflow: hidden;
    }
    .tableOptions {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        align-items: center;
        -webkit-box-align: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-color: rgba(0, 0, 0, 0.5);
        line-height: 1.15;
    }
    .tableOptionsFilter {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }
    .tableOptionsSearch {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        flex: 1;
    }
    .tableOptionsCreate {
        flex-shrink: 0;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }
    .selectionRun {
        line-height: 1.15;
    }
    table {
        width: 100%;
        display: table;
        overflow: hidden;
        border-collapse: collapse;
        border-spacing: 0;
    }
    .table td {
        font-weight: 300;
        color: rgba(0, 0, 0, 0.9);
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: rgba(0, 0, 0, 0.5);
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        min-width: 56px;
        height: 3.8125rem;
    }
    tr:hover td {
        background-color: #2e5bff25;
    }
    .table td,
    .table th {
        vertical-align: middle;
    }
    .table th {
        background-color: #f0f0f0;
        font-weight: 800;
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.8);
        text-transform: uppercase;
        border-bottom-width: 2px;
        border-color: rgba(0, 0, 0, 0.5);
        padding: 0.75rem;
        letter-spacing: 0.05em;
    }
    .w-16 {
        width: 4rem;
    }
    .text-left {
        text-align: left;
    }
    .text-right {
        text-align: right;
    }
    .td-fit {
        width: 1%;
        white-space: nowrap;
    }
    .items-center {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .inline-flex {
        display: inline-flex;
    }
    .itemButton {
        padding-right: 0.75rem;
    }
</style>
