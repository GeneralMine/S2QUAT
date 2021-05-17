<script>
    import Card from "./Card.svelte";

    export let title = "Test";
    export let value = 1337;
    export let icon = undefined;
</script>

<Card {title} {icon}>
    <div class="container">
        <h2 class="number">{value}</h2>
    </div>
</Card>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    h2 {
        font-size: 2.25rem;
    }
</style>
