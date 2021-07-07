<script>
	import BooleanInput from './inputs/BooleanInput.svelte';
	import ScoreInput from './inputs/ScoreInput.svelte';
	import TextInput from './inputs/TextInput.svelte';
	import CheckBoxInput from './inputs/CheckBoxInput.svelte';
	import RadioButtonInput from './inputs/RadioButtonInput.svelte';

	export let question;

	if (!question.answer) {
		question.answer = {};
	}
</script>

<div class="content">
	<p class="textBlock">{question.description}</p>

	{#if question.typ === 'SCORE'}
		<ScoreInput bind:score={question.answer.score} />
	{:else if question.typ === 'TEXT'}
		<TextInput bind:text={question.answer.text} />
	{:else if question.typ === 'SCORE_TEXT'}
		<ScoreInput bind:score={question.answer.score} />
		<TextInput bind:text={question.answer.text} />
	{:else if question.typ === 'BOOLEAN'}
		<BooleanInput bind:boolean={question.answer.boolean} options={question.typeOptions} />
	{:else if question.typ === 'CHECKBOX'}
		<CheckBoxInput bind:checkbox={question.answer.checkbox} options={question.typeOptions} />
	{:else if question.typ === 'RADIOBUTTON'}
		<RadioButtonInput
			bind:radiobutton={question.answer.radiobutton}
			options={question.typeOptions}
		/>
	{/if}
</div>

<style>
	.content {
		padding-left: 0.6rem;
		padding-right: 0.6rem;
	}
</style>
