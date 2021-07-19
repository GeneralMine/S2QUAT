<script>
	import { createEventDispatcher } from 'svelte';
	import { post, unpack } from '$lib/utils/api';

	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';

	import Prompt from './Prompt.svelte';

	const dispatch = createEventDispatcher();

	export let open;
	let requiredWarning = false;

	export let field;
	if (!field) field = {};

	async function createField() {
		if (document.getElementById('fieldPromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post(`model/field/${field.id}.json`, {
					name: field.name,
					description: field.description,
					order: field.order
				})
			);
			success(res.field);
		} else {
			requiredWarning = true;
		}
	}

	function closePrompt() {
		dispatch('close', {});
		open = false;
	}

	function success(field) {
		dispatch('success', { field });
		closePrompt();
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot slot="header">
		<h2>Aktualisiere Feld</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="fieldPromptName"
					class:requiredWarning
					required
					type="text"
					placeholder="Feldname"
					bind:value={field.name}
					on:change={() => (requiredWarning = false)}
				/>
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<textarea rows="6" placeholder="Seitenbeschreibung" bind:value={field.description} />
			</ListItemRow>
			<ListItemRow>
				<p>Reihenfolge</p>
				<input type="number" bind:value={field.order} />
			</ListItemRow>
		</List>
	</slot>
	<slot slot="footer">
		<button on:click={createField}>Update</button>
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
