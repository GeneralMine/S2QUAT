<script>
    import Icon from "../common/Icon.svelte";
    import GenderPicker from "../common/GenderPicker.svelte";

    import { clickOutside } from "../utils/click_outside";
    import { person } from "./person";

    export let name = $person?.name ?? "";
    export let age = $person?.age ?? 0;
    export let gender = $person?.gender ?? "M";

    export let closed = true;

    function save() {
        closed = !closed;
        $person = { name, age, gender };
    }

    function open_registration(event) {
        closed = false;
        event.stopPropagation();
    }
</script>

{#if closed}
    <button id="open" on:click={open_registration}>
        <Icon title="testPersons" />
    </button>
{:else}
    <div
        use:clickOutside={() => {
            closed = true;
        }}
        class="freefloat_center"
    >
        <div class="box boxAge">
            <label>
                Alter<br />
                <input name="age" type="number" bind:value={age} />
            </label>
        </div>

        <div class="box boxName">
            <label>
                Ganzer Name<br />
                <input name="name" type="text" bind:value={name} />
            </label>
        </div>
        <div class="box boxGender">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>
                Geschlecht<br />
                <GenderPicker bind:value={gender} />
            </label>
        </div>
        <div class="boxSave">
            <button class="save" on:click={save}> Speichern </button>
        </div>
    </div>
{/if}

<style>
    #open {
        width: 100%;
        height: 100%;
    }

    .freefloat_center {
        background-color: rgb(209, 209, 209);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: grid;
        gap: 1rem;
        grid-template:
            ". age ." 4rem
            ". name ." 4rem
            ". gender ." 4rem
            ". save ." 4rem /
            1fr 24rem 1fr;
    }

    label {
        display: block;
        width: 100%;
    }

    input {
        justify-self: center;
    }

    .boxAge {
        grid-area: age;
    }
    .boxName {
        grid-area: name;
    }
    .boxGender {
        grid-area: gender;
    }
    .boxSave {
        grid-area: save;
    }

    .save {
        width: 8rem;
        border: 1px solid blue;
        border-radius: 4px;
        background: none;
        text-decoration: underline;
        color: blue;
    }
</style>
