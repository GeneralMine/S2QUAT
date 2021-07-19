<script>
	import { createEventDispatcher } from 'svelte';
	import { post, unpack } from '$lib/utils/api';

	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';

	import Prompt from './Prompt.svelte';

	const dispatch = createEventDispatcher();

	export let open;
	let requiredWarning = false;

	export let attribute;
	if (!attribute) attribute = {};

	export let field;

	async function createAttribute() {
		if (document.getElementById('attributePromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post(`model/field/${field}/attribute`, {
					id: attribute.id,
					name: attribute.name,
					description: attribute.description,
					order: attribute.order,
					field
				})
			);
			success(res.attribute, res.updated);
		} else {
			requiredWarning = true;
		}
	}

	function closePrompt() {
		dispatch('close', {});
		open = false;
		attribute = {};
	}

	function success(attribute, updated) {
		dispatch('success', { attribute, updated });
		closePrompt();
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot slot="header">
		<h2>Qualitätsmerkmal</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="attributePromptName"
					class:requiredWarning
					required
					type="text"
					placeholder="Name der neuen Kategorie"
					bind:value={attribute.name}
					on:change={() => (requiredWarning = false)}
				/>
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<textarea rows="4" placeholder="Kategorienbeschreibung" bind:value={attribute.description} />
			</ListItemRow>
			<ListItemRow>
				<p>Reihenfolge</p>
				<input type="number" bind:value={attribute.order} />
			</ListItemRow>
		</List>
	</slot>
	<slot slot="footer">
		<button on:click={createAttribute}>Erstellen</button>
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
