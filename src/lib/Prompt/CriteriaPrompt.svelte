<script>
	import { createEventDispatcher } from 'svelte';
	import { post, unpack } from '$lib/utils/api';

	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';

	import Prompt from './Prompt.svelte';

	const dispatch = createEventDispatcher();

	export let open;
	let requiredWarning = false;

	export let criteria;
	if (!criteria) criteria = {};

	export let factor;
	export let attribute;
	export let field;

	async function createCriteria() {
		if (document.getElementById('criteriaPromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post(`model/field/${field}/attribute/${attribute}/factor/${factor}/criteria`, {
					id: criteria.id,
					name: criteria.name,
					description: criteria.description,
					order: criteria.order,
					factor
				})
			);
			success(res.criteria, res.updated);
		} else {
			requiredWarning = true;
		}
	}

	function closePrompt() {
		dispatch('close', {});
		open = false;
		criteria = {};
	}

	function success(criteria, updated) {
		dispatch('success', { criteria, updated });
		closePrompt();
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot slot="header">
		<h2>Bewertungskriterium</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="criteriaPromptName"
					class:requiredWarning
					required
					type="text"
					placeholder="Name des Kriteriums"
					bind:value={criteria.name}
					on:change={() => (requiredWarning = false)}
				/>
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<textarea rows="4" placeholder="Beschreibung des Kriteriums" bind:value={criteria.description} />
			</ListItemRow>
			<ListItemRow>
				<p>Reihenfolge</p>
				<input type="number" placeholder="0" bind:value={criteria.order} />
			</ListItemRow>
		</List>
	</slot>
	<slot slot="footer">
		<button on:click={createCriteria}>Erstellen</button>
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
