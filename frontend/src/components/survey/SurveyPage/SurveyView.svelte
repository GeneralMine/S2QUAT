<script>
    import { createEventDispatcher } from "svelte";
    import { createNode } from "../../../lib/treeLib";
    import Button from "../../common/Button.svelte";
    import Tab from "./Tab.svelte";
    import Ebene3Handler from "./Ebene3Handler.svelte";

    const dispatch = createEventDispatcher();

    export let root_id;
    export let questionsMap;

    const node = createNode({ id: root_id }, questionsMap);
</script>

<h1>MAHALO MATHAFACKA {root_id}</h1>

{#each node.children as ebene2}
    <Tab title={ebene2.description}>
        {#each ebene2.children as ebene3}<Ebene3Handler {ebene3} /> {/each}
    </Tab>
{/each}

<Button on:click={() => dispatch("back")} title="Zurück zur Auswahl" />
