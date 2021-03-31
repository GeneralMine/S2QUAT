<script>
    import QuestionView from "./QuestionView.svelte";
    import Tab from "./Tab.svelte";

    export let ebene3;

    $: console.log("Ebene3Handler", ebene3);
</script>

{#if ebene3.children.length > 1}
    <Tab title={ebene3.description}>
        {#each ebene3.children as q}
            <QuestionView question={q} />
        {/each}
    </Tab>
{:else if ebene3.children}
    <QuestionView question={ebene3} />
{:else}
    <QuestionView question={ebene3.children[0]} />
{/if}
