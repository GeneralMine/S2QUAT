<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { get, post, unpack } from '$lib/utils/api';

	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';
	import { parseEnumToEmoji } from '$lib/utils/textParser';

	import Prompt from './Prompt.svelte';

	const dispatch = createEventDispatcher();

	export let open;
	let requiredWarning = false;
	let companies = [];
	let stati = ['ACTIVE', 'INACTIVE', 'ARCHIVED'];

	let name;
	let description;
	let goal;
	let company;
	let status;
	let projectStart;
	let projectEnd;

	onMount(async () => {
		const res = await get('company/list');
		companies = res.companies;
	});

	async function createCompany() {
		if (document.getElementById('projectPromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post('project/create', {
					name,
					description,
					goal,
					company,
					status,
					projectStart,
					projectEnd
				})
			);
			success(res.project);
		} else {
			requiredWarning = true;
		}
	}

	function closePrompt() {
		dispatch('close', {});
		open = false;
	}

	function success(project) {
		dispatch('success', project);
		closePrompt();
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot slot="header">
		<h2>Neues Projekt</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="projectPromptName"
					class:requiredWarning
					required
					type="text"
					placeholder="Projektname"
					bind:value={name}
					on:change={() => (requiredWarning = false)}
				/>
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<textarea rows="4" placeholder="Projektbeschreibung" bind:value={description} />
			</ListItemRow>
			<ListItemRow>
				<p>Ziel</p>
				<input type="text" placeholder="Projektziel" bind:value={goal} />
			</ListItemRow>
			<ListItemRow>
				<p>Unternehmen</p>
				<select bind:value={company}>
					<option selected value={null}>Keine</option>
					{#each companies as com}
						<option value={com.id}>{com.name}</option>
					{/each}
				</select>
			</ListItemRow>
			<ListItemRow>
				<p>Projektstatus</p>
				<select bind:value={status}>
					{#each stati as stat}
						<option value={stat}>{parseEnumToEmoji(stat)} - {stat}</option>
					{/each}
				</select>
			</ListItemRow>
			<ListItemRow>
				<p>Projektstart</p>
				<input type="date" bind:value={projectStart} />
			</ListItemRow>
			<ListItemRow>
				<p>Projektende</p>
				<input type="date" bind:value={projectEnd} />
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
	select {
		display: flex;
		align-self: center;
		width: 20rem;
	}
	.requiredWarning {
		border-color: red;
	}
</style>
