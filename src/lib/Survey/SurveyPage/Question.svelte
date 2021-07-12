<script>
	import BooleanInput from './inputs/BooleanInput.svelte';
	import ScoreInput from './inputs/ScoreInput.svelte';
	import TextInput from './inputs/TextInput.svelte';
	import CheckBoxInput from './inputs/CheckBoxInput.svelte';
	import RadioButtonInput from './inputs/RadioButtonInput.svelte';

	export let question;
	export let edit;

	if (!question.answer) {
		question.answer = {};
	}

	$: console.log(question.answer);
</script>

<div class="content">
	<p class="textBlock">{question.description}</p>

	{#if question.type === 'SCORE'}
		<ScoreInput bind:score={question.answer.score} {edit} />
	{:else if question.type === 'TEXT'}
		<TextInput bind:text={question.answer.text} {edit} />
	{:else if question.type === 'SCORE_TEXT'}
		<ScoreInput bind:score={question.answer.score} {edit} />
		<TextInput bind:text={question.answer.text} {edit} />
	{:else if question.type === 'BOOLEAN'}
		<BooleanInput bind:boolean={question.answer.boolean} {edit} options={question.typeOptions} />
	{:else if question.type === 'CHECKBOX'}
		<CheckBoxInput bind:checkbox={question.answer.checkbox} {edit} options={question.typeOptions} />
	{:else if question.type === 'RADIOBUTTON'}
		<RadioButtonInput bind:radiobutton={question.answer.radiobutton} options={question.typeOptions} {edit} />
	{:else if question.type === 'CHECKBOX_OTHER'}
		<CheckBoxInput bind:checkbox={question.answer.checkbox} {edit} options={question.typeOptions} />
		<TextInput rows="2" placeholder="Sonstiges..." bind:text={question.answer.text} {edit} />
	{/if}
</div>

<style>
	.content {
		padding-left: 0.6rem;
		padding-right: 0.6rem;
	}
</style>
