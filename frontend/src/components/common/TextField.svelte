<script>
    export let id;
    export let label;
    export let type = "text";
    export let value = "";
    export let revealed = false;
    export let placeholder = "";
    export let color = "gray";

    const revealToggle = (event) => {
        const input = event.currentTarget.previousElementSibling;

        if (!input) {
            return;
        }

        input.type = input.type === "password" ? "text" : "password";
        revealed = !revealed;
    };

    const handleInput = (event) => {
        value = event.target.value;
    };
</script>

{#if label !== undefined && label !== ""}
    <label for={id}>{label}</label>
{/if}
<div class="container">
    <input class="container textfield" style="border: 1px solid {color};" {id} {type} {value} {placeholder} on:keyup|preventDefault on:input={handleInput} />
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
    }
    .textfield {
        background-color: transparent;
        border: 0;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        border-radius: 5px;
    }
</style>
