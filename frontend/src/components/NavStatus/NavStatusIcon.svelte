<script>
    import Icon from "../common/Icon.svelte";
    export let selected;
</script>

<div class="container">
    <Icon bind:title={selected} />
</div>

<style>
    .container {
        margin: 0;
        padding: 0;
    }
</style>
