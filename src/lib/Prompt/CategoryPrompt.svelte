<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { post, unpack } from '$lib/api';

	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';

	import Prompt from './Prompt.svelte';

	const dispatch = createEventDispatcher();

	export let open;
	let requiredWarning = false;

	// For edit an existing!
	export let category;
	if (!category) category = {};

	export let project;
	export let scenario;
	export let survey;
	export let page;

	async function createCompany() {
		if (document.getElementById('categoryPromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post(`project/${project}/scenario/${scenario}/survey/${survey}/category`, {
					id: category.id,
					name: category.name,
					description: category.description,
					survey,
					page
				})
			);
			success(res.category, res.updated);
		} else {
			requiredWarning = true;
		}
	}

	function closePrompt() {
		dispatch('close', {});
		open = false;
		category = {};
	}

	function success(category, updated) {
		dispatch('success', { category, updated });
		closePrompt();
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot slot="header">
		<h2>Neues Kategorie</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="categoryPromptName"
					class:requiredWarning
					required
					type="text"
					placeholder="Name der neuen Kategorie"
					bind:value={category.name}
					on:change={() => (requiredWarning = false)}
				/>
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<textarea rows="4" placeholder="Kategorienbeschreibung" bind:value={category.description} />
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
