<script>
    import { createEventDispatcher } from "svelte";
    import { createNode } from "../../../lib/treeLib";
    import Button from "../../common/Button.svelte";
    import Tab from "./Tab.svelte";
    import Ebene3Handler from "./Ebene3Handler.svelte";

    const dispatch = createEventDispatcher();

    export let root_id;
    export let questions;
    export let questionsMap;
    let root_object = getRootObject(root_id);

    const node = createNode({ id: root_id }, questionsMap);

    function getRootObject(id) {
        for (let q of questionsMap[null]) {
            if (q.id === id) {
                return q;
            } else {
                return null;
            }
        }
    }
</script>

<h1>{root_object.name}</h1>
<code>{root_object.description}</code>

{#each node.children as ebene2}
    <Tab title={ebene2.description}>
        {#each ebene2.children as ebene3}<Ebene3Handler {ebene3} /> {/each}
    </Tab>
{/each}

<Button on:click={() => dispatch("back")} title="Zurück zur Auswahl" />
