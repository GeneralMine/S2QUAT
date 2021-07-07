<script>
	import BooleanInput from './inputs/BooleanInput.svelte';
	import ScoreInput from './inputs/ScoreInput.svelte';
	import TextInput from './inputs/TextInput.svelte';
	import CheckBoxInput from './inputs/CheckBoxInput.svelte';
	import RadioButtonInput from './inputs/RadioButtonInput.svelte';

	export let question;
	$: console.log(question.id + ':', question);
	question.typeOptions.push('Random');
	let score;
	let text;
	let boolean;
	let checkbox;
	let radiobutton;

	if (!question.answer) {
		question.answer = {};
		score = question.answer.score;
		text = question.answer.text;
		boolean = question.answer.boolean;
		checkbox = question.answer.checkbox;
		radiobutton = question.answer.radiobutton;
		console.log('Restored stuff:', score);
	}

	$: question.answer.score = score || question.answer.score;
	$: question.answer.text = text || question.answer.text;
	$: question.answer.boolean = boolean || question.answer.boolean;
	$: question.answer.checkbox = checkbox || question.answer.checkbox;
	$: question.answer.radiobutton = radiobutton || question.answer.radiobutton;
</script>

<div class="content">
	<p class="textBlock">{question.description}</p>

	{#if question.typ === 'SCORE'}
		<ScoreInput bind:score />
	{:else if question.typ === 'TEXT'}
		<TextInput bind:text />
	{:else if question.typ === 'SCORE_TEXT'}
		<ScoreInput bind:score />
		<TextInput bind:text />
	{:else if question.typ === 'BOOLEAN'}
		<BooleanInput bind:boolean options={question.typeOptions} />
	{:else if question.typ === 'CHECKBOX'}
		<CheckBoxInput bind:checkbox options={question.typeOptions} />
	{:else if question.typ === 'RADIOBUTTON'}
		<RadioButtonInput bind:radiobutton options={question.typeOptions} />
	{/if}
</div>

<style>
	.content {
		padding-left: 0.6rem;
		padding-right: 0.6rem;
	}
</style>
