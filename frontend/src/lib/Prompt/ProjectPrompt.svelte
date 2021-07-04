<script>
	import { onMount } from 'svelte';
	import { roflul, get } from '$lib/api';

	import List from '$lib/List/List.svelte';
	import Prompt from './Prompt.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';
	import { parseEnumToEmoji } from '$lib/textParser';

	export let open;

	let companies = [];
	let stati = ['ACTIVE', 'INACTIVE', 'ARCHIVED'];

	let projectName = '';
	let projectDescription = '';
	let projectGoal = '';
	let company;
	let status;
	let projectStart;
	let projectEnd;

	$: console.log(companies);

	onMount(async () => {
		companies = await fetchCompanies();
	});

	async function fetchCompanies() {
		let { res, err } = roflul(() => get('company/all'));
		console.log(res);
		if (err) console.error(err);
		if (res) return res.companies || [];
		return [];
	}

	async function createCompany() {
		let data;
		if (projectName !== '') data.projectName = projectName;
		if (projectDescription !== '') data.projectDescription = projectDescription;
	}
	function closePrompt() {
		open = false;
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot name="header">
		<h2>Neues Projekt</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name</p>
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
	<slot name="footer">
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
</style>
