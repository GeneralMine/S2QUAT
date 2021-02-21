<script>
    import Surface from "../common/Surface.svelte";
    import DataModelItem from "./DataModelItem.svelte";

    export let questionsMap = [];
</script>

<Surface>
    <div class="container">
        <div class="grid-container">
            <div class="grid-titel">Smart Service Qualität</div>
            <div class="grid-columnBar">Gestaltungsdimensionen</div>
            <div class="grid-column">Potenzial</div>
            <div class="grid-column">Prozess</div>
            <div class="grid-column">Ergebnis</div>
            <div class="grid-rowBar">Leistungsbestandteile</div>
            <div class="grid-row">Koordination</div>
            <DataModelItem on:select_root id={10} {questionsMap} />
            <DataModelItem on:select_root id={11} {questionsMap} />
            <DataModelItem on:select_root id={12} {questionsMap} />
            <div class="grid-row">Persönliche Dienstleistung</div>
            <DataModelItem on:select_root id={7} {questionsMap} />
            <DataModelItem on:select_root id={8} {questionsMap} />
            <DataModelItem on:select_root id={9} {questionsMap} />
            <div class="grid-row">Digitaler Dienst</div>
            <DataModelItem on:select_root id={4} {questionsMap} />
            <DataModelItem on:select_root id={5} {questionsMap} />
            <DataModelItem on:select_root id={6} {questionsMap} />
            <div class="grid-row">Technologie & Daten</div>
            <DataModelItem on:select_root id={1} {questionsMap} />
            <DataModelItem on:select_root id={2} {questionsMap} />
            <DataModelItem on:select_root id={3} {questionsMap} />
        </div>
    </div>
</Surface>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .grid-container {
        display: grid;
        grid-template-rows: 60px 60px 114px 114px 114px 114px;
        grid-template-columns: 60px 216px 300px 300px 300px;
        grid-gap: 10px;
        /* background-color: #2196f3; */
        padding: 10px;
    }
    .grid-container > div {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0;
    }
    .grid-titel {
        background-color: #00a5c5;
        grid-row: 1 / 3;
        grid-column: 1 / 3;
        font-size: 35px;
        color: white;
    }
    .grid-columnBar {
        background-color: #72bbe8;
        grid-column: 3 / 6;
        grid-row: 1 / 2;
        font-size: 30px;
        color: white;
    }
    .grid-column {
        background-color: #b7dcf3;
        font-size: 25px;
    }
    .grid-rowBar {
        background-color: #a8afaf;
        grid-row: 3 / 7;
        /* Cant use this, because only firefox is so nice and supports this
        writing-mode: sideways-lr; */
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        font-size: 30px;
        color: white;
    }
    .grid-row {
        background-color: #d9d9d9;
        font-size: 25px;
    }
</style>
