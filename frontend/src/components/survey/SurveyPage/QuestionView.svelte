<script>
    export let question;
    $: console.log("QuestionView", question);
</script>

<div class="container">
    <div class="questionTitle">{question.name}</div>
    <div class="questionDescription">{question.description}</div>
    <div class="questionRating">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        background-color: cyan;
    }
    .questionTitle {
    }
    .questionDescription {
    }
    .questionRating {
        display: flex;
        flex-direction: row;
    }
</style>
