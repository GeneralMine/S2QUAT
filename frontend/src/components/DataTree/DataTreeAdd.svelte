<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/
    export let colors = [];
    export let depth;
    export let parent = null;
    export let id;
    import { createEventDispatcher } from "svelte";
    import Icon from "../common/Icon.svelte";
    import { postData } from "../../lib/index";

    const dispatch = createEventDispatcher();

    async function insertBlankEntry(isChildren) {
        let url = BACKEND_URL + "/questions";
        console.log("Insert blank entry at " + url);
        let data = {
            name: "Template",
            description: "Template",
            depth,
        };
        console.log("data", data);
        let res = await (await postData(url, data)).json();
        console.log("Successfully inserted!", res);

        let newId = res.id;
        let updateData = { id: newId };
        if (isChildren) {
            updateData["parent"] = { question: id };
            updateData["depth"] = data["depth"] + 1;
            console.log("as children", updateData.parent);
        } else {
            updateData["parent"] = { question: parent };
            console.log("no children", updateData.parent);
        }
        console.log("updateData", updateData);
        await postData(url + "/" + newId, updateData);
        console.log("Successfully updated!");

        dispatch("update", {
            text: "update",
        });
    }

    function addEntry() {
        insertBlankEntry(false);
    }

    function addChildren() {
        insertBlankEntry(true);
    }
</script>

<div class="container" style="background-color: rgba({colors[depth]}, 0.2); width: 100%; height: 20px; display: flex; flex-direction: row;
        align-items: center; padding-bottom: 5px;">
    <div class="iconBox" on:click={addEntry}>
        <div class="icon">
            <Icon title="add_circle" />
        </div>
    </div>
    <div class="line" />
    <div class="iconBox" on:click={addChildren}>
        <div class="icon">
            <Icon title="add_circle_outline" />
        </div>
    </div>
    <div class="line" />
    <div class="iconBox" />
</div>

<style>
    .container:hover > div > .icon {
        visibility: visible;
    }
    .container:hover > .line {
        height: 2px;
        background-color: rgba(128, 128, 128, 1);
    }
    .iconBox {
        width: 40px;
        height: 20px;
        min-width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon {
        width: 20px;
        height: 20px;
        visibility: hidden;
    }
    .icon:hover {
        -webkit-transform: scale(1.5);
    }
    .line {
        background-color: rgba(128, 128, 128, 0.644);
        height: 1px;
        width: 99%;
    }
</style>
