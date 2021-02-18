<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    export let title;
</script>

<div class="container">
    <div class="text">
        <h5>{title}</h5>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        padding-top: 0.5em;
        padding-bottom: 0.2em;
        padding-left: 0.2em;
        margin: 0;
        border-top: 1px solid rgba(128, 128, 128, 0.3);
    }

    .text {
        margin-left: 8px;
    }
</style>
