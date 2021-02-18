<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/

    import DataTree from "../../components/DataTree/DataTree.svelte";
    import DataTreeList from "../../components/DataTree/DataTreeList.svelte";
    import DataTreeAdd from "../../components/DataTree/DataTreeAdd.svelte";
    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import { remodel, createNode } from "../../lib/treeLib";
    import { goto } from "@sapper/app";
    import { onMount } from "svelte";
    import Surface from "../../components/common/Surface.svelte";
    let questions = [];
    let entitiesMap;
    let selectedID;
    //const colors = [];
    const colors = ["9,176,56", "9,186,110", "9,164,186", "9,111,176"];
    //const colors = ["38,166,154", "77,182,172", "128,203,196", "178,223,219"];
    //const colors = ["76,175,80", "244,67,54", "33,150,243", "255,235,59"];
    const levels = ["Bewertungsfelder", "Qualitätsmerkmale", "Qualitätsbestimmende Faktoren", "Bewertungskriterien"];
    onMount(async () => {
        await reloadData();
    });
    async function reloadData() {
        const url = BACKEND_URL + "/questions";
        questions = await (await getData(url)).json();
        console.log("Data got", questions);
        entitiesMap = remodel(questions);
        console.log("remodeled", entitiesMap);
    }
    function onSelect(ev) {
        selectedID = ev.detail.id;
    }
    let choice = 0;
</script>

<svelte:head>
    <title>Datatree - S2QUAT</title>
</svelte:head>

<div class="page">
    <Surface>
        <div style="display: flex; flex-direction: row; align-items: center; padding: 1em;">
            <div style="flex-flow: 1; flex-grow: 1; display: flex; flex-direction: row; align-items: center;">
                {#each colors as color, i}
                    <div
                        style="flex-flow: {i}; display: flex; flex-direction: row; align-items: center; padding-right: 5px; padding-left: 5px; padding-top: -8px; padding-bottom: -8px;border-width: 7px; border-color: rgba({color}, 0.2); border-style: solid;"
                    >
                        <p style="">{levels[i]}</p>
                    </div>
                    {#if !(i == colors.length - 1)}
                        <p style="margins: 15px; padding: 5px;">{" >> "}</p>
                    {/if}
                {/each}
            </div>
        </div>
    </Surface>

    <Surface>
        {#if entitiesMap !== undefined && entitiesMap != null && entitiesMap.length !== 0}
            <DataTreeList on:update={reloadData} extended={true} indented={false}>
                {#each entitiesMap[null] as root}
                    <DataTree on:update={reloadData} {selectedID} on:select={onSelect} {entitiesMap} node={createNode(root, entitiesMap)} extended={false} depth={0} {colors} />
                    <DataTreeAdd on:update={reloadData} id={root.id} parent={root.parent != null ? root.parent.id : null} depth={0} {colors} />
                {/each}
            </DataTreeList>
        {:else}loading...{/if}
    </Surface>
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
    }
</style>
