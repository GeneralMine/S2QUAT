<script>
    import Surface from "../common/Surface.svelte";
    import ModelView from "./SurveyPage/ModelView.svelte";
    import SurveyView from "./SurveyPage/SurveyView.svelte";

    export let questions;
    export let questionsMap;

    // - ModelView
    //     - visualizer of fraunhofer quality model with the selected fields
    //     - progress per field: (current / todo) questions
    //     - grey := current !== todo
    //     - blue := current === todo
    //     - click on a field -> SurveyView
    // - SurveyView

    let root_id = undefined;

    /**
     * @param {Event} event
     */
    function root_selected(event) {
        root_id = event.detail;
        console.log("Selected root:", root_id);
    }
</script>

<Surface title="SurveyPage">
    {#if root_id === undefined}
        <ModelView on:select_root={root_selected} {questions} {questionsMap} />
    {:else}
        <SurveyView {questions} {questionsMap} on:back={() => (root_id = undefined)} {root_id} />
    {/if}
</Surface>
