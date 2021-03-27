<script>
    import Surface from "../common/Surface.svelte";
    import DataModel from "../DataModel/DataModel.svelte";

    export let title = "TestScenario";
    export let description = "Fahrer einer Müllabfuhr unter Verwendung der neuen KI";
</script>

<div class="scenarioPageContainer">
    <h3>{title}</h3>
    <p>{description}</p>

    <div class="dataModel">
        <DataModel />
    </div>
</div>

<style>
    .scenarioPageContainer {
        display: flex;
        flex-direction: column;
    }
    .dataModel {
        width: 100%;
        height: 350px;
        scale: 0.5;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
    }
</style>
