<script>
    import DataModel from "../../DataModel/DataModel.svelte";

    export let questions;
    export let questionsMap;
</script>

<DataModel on:select_root {questionsMap} />
