<script>
    export let id;
    export let questionsMap;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<div class="grid-item" on:click={() => dispatch("select_root", id)}>
    <p class="text">
        Feld {id}
        {questionsMap != null && questionsMap[id] !== undefined ? "(" + questionsMap[id].length + ")" : ""}
    </p>
</div>

<style>
    .grid-item {
        display: flex;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        font-size: 25px;
        align-items: center;
        justify-content: center;
    }
    .text {
        text-align: center;
    }
</style>
