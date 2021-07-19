<script>
	import { createEventDispatcher } from 'svelte';
	import { post, unpack } from '$lib/utils/api';

	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';

	import Prompt from './Prompt.svelte';

	const dispatch = createEventDispatcher();

	export let open;
	let requiredWarning = false;

	export let factor;
	if (!factor) factor = {};

	export let attribute;
	export let field;

	async function createFactor() {
		if (document.getElementById('factorPromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post(`model/field/${field}/attribute/${attribute}/factor`, {
					id: factor.id,
					name: factor.name,
					description: factor.description,
					order: factor.order,
					attribute
				})
			);
			success(res.factor, res.updated);
		} else {
			requiredWarning = true;
		}
	}

	function closePrompt() {
		dispatch('close', {});
		open = false;
		factor = {};
	}

	function success(factor, updated) {
		dispatch('success', { factor, updated });
		closePrompt();
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot slot="header">
		<h2>Qualitätsbestimmender Faktor</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="factorPromptName"
					class:requiredWarning
					required
					type="text"
					placeholder="Name der neuen Kategorie"
					bind:value={factor.name}
					on:change={() => (requiredWarning = false)}
				/>
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<textarea rows="4" placeholder="Kategorienbeschreibung" bind:value={factor.description} />
			</ListItemRow>
			<ListItemRow>
				<p>Reihenfolge</p>
				<input type="number" bind:value={factor.order} />
			</ListItemRow>
		</List>
	</slot>
	<slot slot="footer">
		<button on:click={createFactor}>Erstellen</button>
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
