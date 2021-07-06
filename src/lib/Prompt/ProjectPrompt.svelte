<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { get, post, unpack } from '$lib/api';

	import List from '$lib/List/List.svelte';
	import Prompt from './Prompt.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';
	import { parseEnumToEmoji } from '$lib/textParser';

	const dispatch = createEventDispatcher();

	export let open;
	let companies = [];
	let stati = ['ACTIVE', 'INACTIVE', 'ARCHIVED'];

	let projectName = '';
	let projectDescription;
	let projectGoal;
	let company;
	let status;
	let projectStart;
	let projectEnd;

	onMount(async () => {
		const res = await get('company/list');
		companies.push(...res.companies);
	});

	async function createCompany() {
		const { res, err } = await unpack(() =>
			post('project/create', {
				projectName,
				projectDescription,
				projectGoal,
				company,
				status,
				projectStart,
				projectEnd
			})
		);

		success(res.project);
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
				<input required type="text" placeholder="Projektname" bind:value={projectName} />
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<input type="text" placeholder="Projektbeschreibung" bind:value={projectDescription} />
			</ListItemRow>
			<ListItemRow>
				<p>Ziel</p>
				<input type="text" placeholder="Projektziel" bind:value={projectGoal} />
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
		<button on:click={createCompany}>Create</button>
		<button class="closeButton" on:click={closePrompt}>Cancel</button>
	</slot>
</Prompt>

<style>
	input {
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
</style>
