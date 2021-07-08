<script>
	import Question from './Question.svelte';
	import Collapsable from '$lib/Common/Collapsable.svelte';
	import { del, unpack } from '$lib/utils/api.js';
	import ListItemRowAdd from '$lib/List/ListItemRowAdd.svelte';
	import QuestionPrompt from '$lib/Prompt/QuestionPrompt.svelte';

	export let project;
	export let scenario;
	export let survey;

	export let edit;
	export let category;

	let questionPrompt = false;
	let selectedQuestion;

	async function refreshQuestions(ev) {
		if (ev.detail.updated) {
			for (let index = 0; index < category.questions.length; index++) {
				if (category.questions[index].id === ev.detail.question.id) {
					category.questions[index].name = ev.detail.question.name;
					category.questions[index].description = ev.detail.question.description;
					break;
				}
			}
		} else {
			category.questions = [...category.questions, ev.detail.question];
		}
		sort();
	}

	async function removeQuestion(question) {
		const { res, err } = await unpack(() =>
			del(`project/${project}/scenario/${scenario}/survey/${survey}/question/${question.id}`)
		);
		if (res.id) {
			for (let index = 0; index < category.questions.length; index++) {
				if (category.questions[index].id === res.id) {
					category.questions.splice(index, 1);
					category.questions = [...category.questions];
					break;
				}
			}
		}
		sort();
	}

	function sort() {
		category.questions.sort((a, b) => a.order - b.order);
	}
	sort();
</script>

<div class="container">
	<p class="textBlock">{category.description}</p>
	{#each category.questions as question, i}
		<Collapsable
			title={question.name}
			expanded={true}
			remove={edit}
			on:remove={() => {
				removeQuestion(question);
			}}
			{edit}
			on:edit={() => {
				selectedQuestion = question;
				console.log('Now selected', selectedQuestion);
				questionPrompt = true;
			}}
		>
			<Question bind:question {edit} />
		</Collapsable>
	{/each}
	{#if edit}
		<ListItemRowAdd
			text="Neue Frage hinzufügen"
			on:click={() => (questionPrompt = questionPrompt = true)}
		/>
	{/if}
</div>
{#if edit}
	<QuestionPrompt
		project={project.id}
		scenario={scenario.id}
		survey={survey.id}
		category={category.id}
		bind:question={selectedQuestion}
		on:success={refreshQuestions}
		bind:open={questionPrompt}
	/>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
