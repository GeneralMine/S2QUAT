<script>
    export let id;
    export let label;
    export let type = "text";
    export let value = "";
    export let revealed = false;
    export let placeholder = "";
    export let color = "gray";
    export let locked = false;

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let textareaElement;
    $: height = textareaElement !== undefined ? textareaElement.scrollHeight : 30;
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
        height = textareaElement.scrollHeight;

        dispatch("changed", value);
    };
</script>

{#if label !== undefined && label !== ""}
    <label for={id}>{label}</label>
{/if}
<div class="container">
    <textarea
        class:locked
        class="container textarea autoresizing"
        bind:this={textareaElement}
        {id}
        {type}
        {value}
        {placeholder}
        border-color={color}
        style="height: {height}px; border: 1px solid {color};"
        on:keyup|preventDefault
    />
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
    }
    .textarea {
        background-color: transparent;
        border: 0;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        border-radius: 5px;
    }
    .autoresizing {
        display: block;
        overflow: hidden;
        resize: none;
    }
    .locked {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
