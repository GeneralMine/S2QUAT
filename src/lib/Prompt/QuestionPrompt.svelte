<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { post, unpack } from '$lib/api';

	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';
	import { parseEnumToEmoji } from '$lib/textParser';

	import Prompt from './Prompt.svelte';

	const dispatch = createEventDispatcher();

	export let open;
	let requiredWarning = false;
	let types = ['SCORE', 'TEXT', 'SCORE_TEXT', 'BOOLEAN', 'CHECKBOX', 'RADIOBUTTON'];

	// For edit an existing!
	export let question;
	if (!question) question = {};

	export let project;
	export let scenario;
	export let survey;
	export let category;

	async function createCompany() {
		if (document.getElementById('questionPromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post(`project/${project}/scenario/${scenario}/survey/${survey}/question`, {
					id: question.id,
					name: question.name,
					description: question.description,
					type: question.type,
					typeOptions: question.typeOptions,
					survey,
					category
				})
			);
			success(res.question, res.updated);
		} else {
			requiredWarning = true;
		}
	}

	function closePrompt() {
		dispatch('close', {});
		open = false;
		question = {};
	}

	function success(question, updated) {
		dispatch('success', { question, updated });
		closePrompt();
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot slot="header">
		<h2>Neue Frage</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="questionPromptName"
					class:requiredWarning
					required
					type="text"
					placeholder="Name der neuen Frage"
					bind:value={question.name}
					on:change={() => (requiredWarning = false)}
				/>
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<textarea rows="4" placeholder="Fragenbeschreibung" bind:value={question.description} />
			</ListItemRow>
			<ListItemRow>
				<p>Fragentyp</p>
				<select bind:value={question.type}>
					{#each types as type}
						<option value={type}>{parseEnumToEmoji(type)} - {type}</option>
					{/each}
				</select>
			</ListItemRow>
		</List>
	</slot>
	<slot slot="footer">
		<button on:click={createCompany}>Erstellen</button>
		<button class="closeButton" on:click={closePrompt}>Abbruch</button>
	</slot>
</Prompt>

<style>
	input,
	textarea {
		width: 20rem;
	}
	.closeButton {
		background-color: grey;
	}
	.requiredWarning {
		border-color: red;
	}
</style>
