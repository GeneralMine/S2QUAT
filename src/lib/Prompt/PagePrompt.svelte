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
	export let page;
	if (!page) page = {};

	export let project;
	export let scenario;
	export let survey;

	async function createCompany() {
		if (document.getElementById('pagePromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post(`project/${project}/scenario/${scenario}/survey/${survey}/page`, {
					id: page.id,
					name: page.name,
					description: page.description,
					survey
				})
			);
			success(res.page, res.updated);
		} else {
			requiredWarning = true;
		}
	}

	function closePrompt() {
		dispatch('close', {});
		open = false;
		page = {};
	}

	function success(page, updated) {
		dispatch('success', { page, updated });
		closePrompt();
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot slot="header">
		<h2>Neues Seite</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="pagePromptName"
					class:requiredWarning
					required
					type="text"
					placeholder="Name der neuen Seite"
					bind:value={page.name}
					on:change={() => (requiredWarning = false)}
				/>
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<textarea rows="4" placeholder="Seitenbeschreibung" bind:value={page.description} />
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
