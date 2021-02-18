<script>
    export let title;
</script>

<div class="button" on:click|preventDefault>{title}</div>

<style>
    .button {
        background-color: #35a8e0;
        border-radius: 0.5rem;
        height: 2.25rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        line-height: 2.25rem;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        display: inline-block;
        text-decoration: none;
        font-weight: 800;
        color: white;
        cursor: pointer;
    }
</style>
