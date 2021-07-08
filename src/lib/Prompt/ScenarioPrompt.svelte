<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { get, post, unpack } from '$lib/utils/api';

	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';

	import Prompt from './Prompt.svelte';

	const dispatch = createEventDispatcher();

	export let open;
	export let projectsDisabled = false;
	let requiredWarning = false;
	let projects = [];

	let name;
	let description;
	export let project;

	onMount(async () => {
		const res = await get('project/list');
		projects = res.projects;
	});

	async function createScenario() {
		if (document.getElementById('scenarioPromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post(`project/${project}/scenario/create`, {
					name,
					description,
					project
				})
			);
			success(res.scenario);
		} else {
			requiredWarning = true;
		}
	}

	function closePrompt() {
		dispatch('close', {});
		open = false;
	}

	function success(scenario) {
		dispatch('success', scenario);
		closePrompt();
	}
</script>

<Prompt bind:open on:close={closePrompt}>
	<slot slot="header">
		<h2>Neues Szenario</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="scenarioPromptName"
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
				<textarea rows="4" placeholder="Szenarienbeschreibung" bind:value={description} />
			</ListItemRow>
			<ListItemRow>
				<p>Zugehöriges Projekt</p>
				<select disabled={projectsDisabled} bind:value={project}>
					{#each projects as pro}
						<option value={pro.id}>{pro.name}</option>
					{/each}
				</select>
			</ListItemRow>
		</List>
	</slot>
	<slot slot="footer">
		<button on:click={createScenario}>Erstellen</button>
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
