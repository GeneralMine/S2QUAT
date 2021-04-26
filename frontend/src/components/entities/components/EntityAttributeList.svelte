<script>
    /********************************************
     * Getting env variables from session store */
    import { stores, goto } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/

    import { onMount } from "svelte";

    import { postData, getData, capitalizeFirstLetter, parseSingular, lowerFirstLetter } from "../../../lib";
    import EntityAttributeModelTree from "./EntityAttributeModelTree.svelte";
    import EntityAttributeListItem from "./EntityAttributeListItem.svelte";
    import EntityAttributeTable from "./EntityAttributeTable.svelte";
    import EntityModels from "../../../lib/entityModels";
    import Button from "../../common/Button.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let entity;
    export let entityObject;
    export let enableEditButton = true;
    export let enableSurveyButton = false;
    // Object Map key = category name, value= list of attribute names of entityObject
    export let categories = null;
    export let isEditMode = entityObject !== null ? false : true;
    export let isNew = false;
    $: selectedCategory = "Allgemein";

    onMount(async () => {
        // Create entityObject if its null (for /new)
        if (entityObject === null) {
            entityObject = {};
            for (const category of Object.keys(categories).filter((el) => el !== "Admin")) {
                if (Array.isArray(categories[category])) {
                    for (const attribute of categories[category]) {
                        switch (attribute.type) {
                            case "table":
                                entityObject[attribute.name] = [];
                                break;
                            case "list":
                                entityObject[attribute.name] = {};
                                break;
                            default:
                                entityObject[attribute.name] = "";
                                break;
                        }
                    }
                } else {
                    switch (categories[category].type) {
                        case "table":
                            entityObject[categories[category].name] = [];
                            break;
                        case "list":
                            entityObject[categories[category].name] = {};
                            break;
                        default:
                            entityObject[categories[category].name] = "";
                            break;
                    }
                }
            }
        }
    });

    function switchSelectedCategory(newValue) {
        selectedCategory = newValue;
        console.log("Switched to " + selectedCategory);
    }

    async function editButtonPressed() {
        isEditMode = !isEditMode;
        console.log("isEditMode:", isEditMode);
        if (!isEditMode) {
            // Push changes to backend

            let url;
            if (!isNew) {
                url = BACKEND_URL + "/" + entity + "/" + entityObject.id;
                console.log("Update at", url);
            } else {
                url = BACKEND_URL + "/" + entity;
                console.log("Inserted at", url);
            }

            let newObject = { ...entityObject };
            // <Relationships>
            for (const relationshipCategoryName of Object.keys(categories).filter((el) => el !== "Admin" && el !== "Allgemein")) {
                let relationshipCategoryItem = categories[relationshipCategoryName];
                // Data is array
                let newRelationShipObject = [];
                if (relationshipCategoryItem.type === "table" || relationshipCategoryItem.type === "model") {
                    for (let relationshipObject of newObject[relationshipCategoryItem.name]) {
                        newRelationShipObject.push(relationshipObject.id);
                    }
                }
                // Data is single object
                else if (relationshipCategoryItem.type === "list") {
                    console.log("doing", newObject[relationshipCategoryItem.name]);
                    newRelationShipObject = newObject[relationshipCategoryItem.name] !== null ? newObject[relationshipCategoryItem.name].id : null;
                }
                let niw = {};
                niw[parseSingular(relationshipCategoryItem.entity !== undefined ? relationshipCategoryItem.entity : relationshipCategoryItem.name)] = newRelationShipObject;
                console.log(niw);
                newObject[lowerFirstLetter(relationshipCategoryName)] = niw;
            }
            console.log("New Object is", newObject);
            console.log(url);
            let redirectID = await (await postData(url, newObject)).json();
            console.log(redirectID);

            if (isNew) {
                goto(entity + "/" + redirectID.id, { replaceState: true });
            } else {
                dispatch("update", {
                    text: "update",
                });
            }
        }
        //console.log(categories[selectedCategory].map((el) => el.name));
    }

    async function getRelationshipEntries(relationshipEntity) {
        const url = BACKEND_URL + "/" + relationshipEntity;
        console.log("Getting relationship at ", url);
        let resEntries = await (await getData(url)).json();
        console.log(resEntries);
        return resEntries;
    }

    function marvinWilldenButtonRausmachen(ev) {
        const selection = ev.detail;
        console.log("Selection got from table is", selection);
        // Single Relatioship
        if (categories[selectedCategory].type === "list") {
            entityObject[categories[selectedCategory].name] = { id: selection[0] };
        } else if (categories[selectedCategory].type === "table" || categories[selectedCategory].type === "model") {
            // resetting existing data
            entityObject[categories[selectedCategory].entity === undefined ? categories[selectedCategory].name : categories[selectedCategory].entity] = [];
            console.log("Cleared relationship data", entityObject[categories[selectedCategory].entity === undefined ? categories[selectedCategory].name : categories[selectedCategory].entity]);
            // overriding
            for (const selectionItem of selection) {
                entityObject[categories[selectedCategory].entity === undefined ? categories[selectedCategory].name : categories[selectedCategory].entity].push({
                    id: selectionItem,
                });
            }
        }
        console.log("entityObject after save", entityObject);
    }

    function getSelection() {
        let temp = entityObject[categories[selectedCategory].name];

        if (temp === null) {
            return [];
        }
        if (!Array.isArray(temp)) {
            let arr = [];
            arr.push(temp.id);
            return arr;
        }

        return temp.map((el) => el.id);
    }

    async function conductSurvey() {
        console.log("Conducting a survey for id", entityObject.id);
        goto("/" + entity + "/" + entityObject.id + "/survey", { replaceState: true });
    }
</script>

<div class="container">
    {#if categories !== null && Object.keys(categories).length > 0}
        <div class="listTabs">
            {#each Object.keys(categories) as category}
                <div class="listTabsItem" class:listTabsItemSelected={selectedCategory === category} on:click={switchSelectedCategory(category)}>
                    {category}
                </div>
            {/each}

            <div class="listTabsItemSpacer" />

            {#if enableSurveyButton}
                <div class="listTabsItemButton">
                    <Button title={"Conduct a survey"} on:click={conductSurvey} />
                </div>
            {/if}

            {#if enableEditButton}
                <div class="listTabsItemButton">
                    <Button title={isEditMode ? "Save Changes" : "Edit " + capitalizeFirstLetter(parseSingular(entity))} on:click={editButtonPressed} />
                </div>
            {/if}
        </div>
    {/if}

    <div class="listView">
        {#if entityObject !== undefined && entityObject !== null}
            {#if categories !== null && Object.keys(categories).length > 0}
                <!-- Category View -->
                {#if Array.isArray(categories[selectedCategory])}
                    <!-- is Allgemein or Admin, so just a normal listing of items -->
                    {#each categories[selectedCategory] as dataType}
                        <EntityAttributeListItem key={dataType.name} bind:value={entityObject[dataType.name]} bind:isEditMode />
                    {/each}
                {:else}
                    <!-- is a relationship tab -->
                    {#if isEditMode}
                        <!-- edit mode, so we need a table for selection of elements -->
                        {#await getRelationshipEntries(categories[selectedCategory].entity === undefined ? categories[selectedCategory].name : categories[selectedCategory].entity)}
                            loading...
                        {:then relationshipEntities}
                            {#if categories[selectedCategory].type === "model"}
                                <EntityAttributeModelTree selection={getSelection()} entities={relationshipEntities} isSelectionMode={true} on:selectionChanged={marvinWilldenButtonRausmachen} />
                            {:else}
                                <!-- else content here -->
                                <EntityAttributeTable
                                    selection={getSelection()}
                                    entity={categories[selectedCategory].entity === undefined ? categories[selectedCategory].name : categories[selectedCategory].entity}
                                    entities={relationshipEntities}
                                    entitiesAttributes={EntityModels[categories[selectedCategory].entity === undefined ? categories[selectedCategory].name : categories[selectedCategory].entity]
                                        .listAttributes}
                                    enableCreateButton={true}
                                    forSelection={true}
                                    on:selectionChanged={marvinWilldenButtonRausmachen}
                                />
                            {/if}
                        {:catch error}
                            Error
                            <code> {error} </code>
                        {/await}
                    {:else}
                        <!-- view mode, so view list or table of relationship -->
                        <!-- If data is present -> Show it, if not -> display empty page -->
                        {#if entityObject[categories[selectedCategory].name] !== null && ((Array.isArray(entityObject[categories[selectedCategory].name]) && entityObject[categories[selectedCategory].name].length > 0) || Object.keys(entityObject[categories[selectedCategory].name]).length > 0)}
                            <!-- data is present -->
                            {#if categories[selectedCategory].type === "table"}
                                <EntityAttributeTable
                                    entity={categories[selectedCategory].entity === undefined ? categories[selectedCategory].name : categories[selectedCategory].entity}
                                    entities={entityObject !== null ? entityObject[categories[selectedCategory].name] : null}
                                    entitiesAttributes={EntityModels[
                                        categories[selectedCategory].entity === undefined ? categories[selectedCategory].name : categories[selectedCategory].entity
                                    ].listAttributes.filter((el) => el.name !== parseSingular(entity))}
                                    enableCreateButton={true}
                                />
                            {:else if categories[selectedCategory].type === "list"}
                                <svelte:self
                                    entity={categories[selectedCategory].entity === undefined ? categories[selectedCategory].name : categories[selectedCategory].entity}
                                    entityObject={entityObject[categories[selectedCategory].name]}
                                    enableEditButton={false}
                                    bind:isEditMode
                                />
                                <!-- categories={EntityModels[dataType.entity === undefined ? dataType.name : dataType.entity].categories} -->
                            {:else if categories[selectedCategory].type === "model"}
                                <EntityAttributeModelTree entities={entityObject[categories[selectedCategory].name]} />
                            {:else}
                                error this should not happen, please tell the admin
                            {/if}
                        {:else}
                            Nothing selected yet. Select something by pressing the "Edit" Button.
                        {/if}
                    {/if}
                {/if}
            {:else}
                <!-- No Category View -->
                {#each Object.keys(entityObject) as key}
                    <EntityAttributeListItem {key} value={entityObject[key]} />
                {/each}
            {/if}
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }
    .listTabs {
        display: flex !important;
        flex-direction: row;
        overflow-x: auto;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
    }
    .listTabsItem {
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        padding-left: 2rem;
        padding-right: 2rem;
        font-weight: 600;
        border-bottom: 2px solid rgb(170, 170, 170);
        box-sizing: inherit;
        cursor: pointer;
        font-family: inherit;
        border-radius: 0;
        background: transparent;
        -webkit-appearance: button;
        text-transform: none;
        overflow: visible;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }
    .listTabsItemSelected {
        font-weight: 800;
        border-bottom: 2px solid #2e5bff;
    }
    .listTabsItemSpacer {
        border-bottom: 2px solid rgb(170, 170, 170);
        -webkit-box-flex: 1;
        flex: 1;
    }
    .listTabsItemButton {
        border-bottom: 2px solid rgb(170, 170, 170);
        display: flex;
        align-items: center;
        -webkit-box-align: center;
        padding-right: 0.75rem;
    }
    .listView {
        display: flex;
        flex-direction: column;
        overflow-x: auto;
        overflow: hidden;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
</style>
