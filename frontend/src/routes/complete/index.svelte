<script>
    import PersonRegistration from "../../components/complete/PersonRegistration.svelte";
    import QuestionView from "../../components/complete/QuestionView.svelte";
</script>

<div class="parent">
    <div class="corner">
        <PersonRegistration />
    </div>
    <div class="header" />
    <div class="content">
        <QuestionView />
    </div>
</div>

<style>
    .parent {
        display: grid;
        grid-template-columns: 4em 1fr;
        grid-template-rows: 4em 24em 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }
    .corner {
        border: 1px solid red;
        grid-area: 1 / 1 / 2 / 2;
    }
    .content {
        border: 1px solid green;
        grid-area: 2 / 2 / 3 / 3;
    }
    .header {
        border: 1px solid blue;
        grid-area: 1 / 2 / 2 / 3;
    }
</style>
