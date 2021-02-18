<script>
    import Surface from "../common/Surface.svelte";

    export let entitiesMap = [];
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
            <div class="grid-item">
                Feld 10
                {entitiesMap != null && entitiesMap[10] !== undefined ? "(" + entitiesMap[10].length + ")" : ""}
            </div>
            <div class="grid-item">
                Feld 11
                {entitiesMap != null && entitiesMap[11] !== undefined ? "(" + entitiesMap[11].length + ")" : ""}
            </div>
            <div class="grid-item">
                Feld 12
                {entitiesMap != null && entitiesMap[12] !== undefined ? "(" + entitiesMap[12].length + ")" : ""}
            </div>
            <div class="grid-row">Persönliche Dienstleistung</div>
            <div class="grid-item">
                Feld 7
                {entitiesMap != null && entitiesMap[7] !== undefined ? "(" + entitiesMap[7].length + ")" : ""}
            </div>
            <div class="grid-item">
                Feld 8
                {entitiesMap != null && entitiesMap[8] !== undefined ? "(" + entitiesMap[8].length + ")" : ""}
            </div>
            <div class="grid-item">
                Feld 9
                {entitiesMap != null && entitiesMap[9] !== undefined ? "(" + entitiesMap[9].length + ")" : ""}
            </div>
            <div class="grid-row">Digitaler Dienst</div>
            <div class="grid-item">
                Feld 4
                {entitiesMap != null && entitiesMap[4] !== undefined ? "(" + entitiesMap[4].length + ")" : ""}
            </div>
            <div class="grid-item">
                Feld 5
                {entitiesMap != null && entitiesMap[5] !== undefined ? "(" + entitiesMap[5].length + ")" : ""}
            </div>
            <div class="grid-item">
                Feld 6
                {entitiesMap != null && entitiesMap[6] !== undefined ? "(" + entitiesMap[6].length + ")" : ""}
            </div>
            <div class="grid-row">Technologie & Daten</div>
            <div class="grid-item">
                Feld 1
                {entitiesMap != null && entitiesMap[1] !== undefined ? "(" + entitiesMap[1].length + ")" : ""}
            </div>
            <div class="grid-item">
                Feld 2
                {entitiesMap != null && entitiesMap[2] !== undefined ? "(" + entitiesMap[2].length + ")" : ""}
            </div>
            <div class="grid-item">
                Feld 3
                {entitiesMap != null && entitiesMap[3] !== undefined ? "(" + entitiesMap[3].length + ")" : ""}
            </div>
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
    .grid-item {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        font-size: 25px;
    }
</style>
