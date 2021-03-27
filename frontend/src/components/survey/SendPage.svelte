<script>
    import Checkbox from "../common/Checkbox.svelte";
    import GenderPicker from "../common/GenderPicker.svelte";
    import TextField from "../common/TextField.svelte";
    export let name;
    export let signature = false;
    export let age;
    export let gender;
</script>

<div class="sendPageContainer">
    <h3>Fast geschafft!</h3>
    <p>Um die Evaluation abzuschließen müssen deine Daten noch abgesendet werden.</p>
    <p>Du kannst Angaben zu deiner Person machen, um bei der Analyse und Verbesserung des Smart Services vollends mitzuwirken</p>
    <div class="testPersonForm">
        <div class="testPersonFormName">
            <TextField bind:value={name} placeholder="Max Mustermann" label="Name" />
        </div>
        <div class="testPersonFormRow">
            <div class="testPersonFormAge">
                <TextField bind:value={age} placeholder="23" label="Alter" />
            </div>
            <div class="testPersonFormGender">
                <GenderPicker bind:value={gender} name="Geschlecht" />
            </div>
        </div>
        <div class="testPersonFormPrivacy">
            <div class="testPersonFormSignature">
                <Checkbox bind:checked={signature} />
            </div>
            <p class="privacyNotice">
                Mit einem Klick auf die Checkbox und auf Senden werden deine Informationen entsprechend unserer <a href="/privacy"> Datenschutzvereinbarung </a> verarbeitet und gespeichert. Du kannst der
                Speicherung jederzeit widersprechen.
            </p>
        </div>
    </div>
</div>

<style>
    .sendPageContainer {
    }

    .testPersonForm {
        display: flex;
        flex-direction: column;
        align-content: center;
    }

    .testPersonFormName {
        width: 33%;
    }

    .testPersonFormRow {
        width: 33%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
    }

    .testPersonFormAge {
        height: 100%;
        width: 40%;
    }
    .testPersonFormGender {
        height: 100%;
        width: 40%;
    }

    .testPersonFormPrivacy {
        width: 83%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .testPersonFormSignature {
        height: 100%;
    }

    .privacyNotice {
        height: 100%;
        font-size: 0.7em;
        padding-left: 1rem;
    }
</style>
