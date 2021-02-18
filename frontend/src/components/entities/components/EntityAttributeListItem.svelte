<script>
    import { capitalizeFirstLetter } from "../../../lib/";
    export let key;
    export let value;
    export let isEditMode = false;
</script>

<div class="container">
    <div class="keyContainer">
        <h4 class="keyText">{capitalizeFirstLetter(key)}</h4>
    </div>
    <div class="valueContainer">
        {#if isEditMode}
            <input class="textField" placeholder="Bezeichner" type="text" bind:value />
        {:else if key === "logo" || key === "icon"}
            <img style="height: 25px; width: auto;object-fit: contain;" src={"entityFiles/" + key + "s/" + value} alt={value} />
        {:else if (key === "original" || key === "changes" || key === "exception") && value !== "{}"}
            <div class="valueJSON">
                <div class="valueJSONHeader">
                    <div class="valueJSONHeaderKey">Key</div>
                    <div class="valueJSONHeaderValue">Value</div>
                </div>
                <div class="valueJSONList">
                    {#each Object.keys(JSON.parse(value)) as parseKey}
                        <div class="valueJSONItem">
                            <div class="valueJSONItemContainerKey">
                                <p class="valueJSONItemContainerKeyText">
                                    {parseKey}
                                </p>
                            </div>
                            <div class="valueJSONItemContainerValue">
                                <p class="valueJSONItemContainerValueText">
                                    {JSON.parse(value)[parseKey] !== "" && JSON.parse(value)[parseKey] !== null
                                        ? typeof JSON.parse(value)[parseKey] === "object"
                                            ? JSON.parse(value)[parseKey][Object.keys(JSON.parse(value)[parseKey])]
                                            : JSON.parse(value)[parseKey]
                                        : "-"}
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <p class="valueText">
                {typeof value === "object" ? value.name : value}
            </p>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid rgba(128, 128, 128, 0.404);
    }
    .keyContainer {
        padding-top: 1rem;
        padding-bottom: 1rem;
        width: 25%;
    }
    .keyText {
        font-weight: 400;
        margin: 0;
        vertical-align: middle;
        line-height: 1.15;
    }
    .valueContainer {
        padding-top: 1rem;
        padding-bottom: 1rem;
        word-wrap: break-word;
        width: 75%;
    }
    .valueJSON {
        position: relative;
        overflow: hidden;
        border-width: 1px;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        border-radius: 0.5rem;
        background-color: #f0f0f0;
        background-clip: border-box;
    }
    .valueJSONHeader {
        display: flex;
        border-bottom: 1px solid gray;
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        background-color: #f0f0f0;
    }
    .valueJSONHeaderKey {
        width: 12rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-size: 0.75rem;
        color: gray;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        font-weight: 800;
        background-clip: border-box;
    }
    .valueJSONHeaderValue {
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-size: 0.75rem;
        color: gray;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        font-weight: 800;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        border-left-width: 1px;
        border-left: 1px solid gray;
        background-clip: border-box;
        margin: 0;
    }
    .valueJSONList {
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        background-clip: border-box;
        border-bottom-width: 0;
        overflow: hidden;
        background-color: white;
        word-wrap: break-word;
    }
    .valueJSONItem {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        display: flex;
        border-bottom: 1px solid gray;
        word-wrap: break-word;
        background-color: #f0f0f0;
    }
    .valueJSONItemContainerKey {
        width: 12rem;
        letter-spacing: 0.05em;
        font-size: 0.75rem;
        color: gray;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        font-weight: 600;
        background-clip: border-box;
    }
    .valueJSONItemContainerValue {
        letter-spacing: 0.05em;
        font-size: 0.75rem;
        color: gray;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        font-weight: 600;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        border-left-width: 1px;
        border-left: 1px solid gray;
        background-clip: border-box;
        margin: 0;
        word-wrap: break-word;
    }
    .valueText {
        margin: 0;
        line-height: 1.15;
    }
    .textField {
        width: 100%;
        background-color: #ffffff;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        color: #000000b9;
        border-width: 1px;
        border-color: #00000088;
        border-radius: 0.5rem;
    }
</style>
