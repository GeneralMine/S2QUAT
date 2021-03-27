<script>
    export let selected = false;
</script>

<div class="pageViewIndicatorBubbleContainer" class:selected />

<style>
    .pageViewIndicatorBubbleContainer {
        opacity: 0.5;
        background-color: grey;
        border-radius: 50%;
        width: 7px;
        height: 7px;
        margin: 0.75em;
    }
    .selected {
        scale: 1.5;
    }
</style>
