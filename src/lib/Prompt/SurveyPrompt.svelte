<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { get, post, unpack } from '$lib/utils/api';

	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';

	import Prompt from './Prompt.svelte';
	import { parseEnumToEmoji } from '$lib/utils/textParser';

	const dispatch = createEventDispatcher();
	export let open;
	export let scenariosDisabled = false;
	let requiredWarning = false;
	let scenarios = [];
	let templates = [];
	let stati = ['ACTIVE', 'CLOSED'];

	let name;
	let description;
	let order;
	let status;
	let template;
	export let scenario;
	export let project;

	onMount(async () => {
		const resS = await get(`project/${project}/scenario/list`);
		scenarios = resS.scenarios;
		const resT = await get('template/list');
		templates = resT.templates;
	});

	async function createScenario() {
		if (document.getElementById('surveyPromptName').validity.valid) {
			const { res, err } = await unpack(() =>
				post(`project/${project}/scenario/${scenario}/survey/create`, {
					name,
					description,
					order,
					status,
					template,
					scenario
				})
			);
			success(res.survey);
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
		<h2>Neuer Fragebogen</h2>
	</slot>
	<slot>
		<List>
			<ListItemRow>
				<p>Name*</p>
				<input
					id="surveyPromptName"
					class:requiredWarning
					required
					type="text"
					placeholder="Fragebogenname"
					bind:value={name}
					on:change={() => (requiredWarning = false)}
				/>
			</ListItemRow>
			<ListItemRow>
				<p>Beschreibung</p>
				<textarea rows="4" placeholder="Fragebogenbeschreibung" bind:value={description} />
			</ListItemRow>
			<ListItemRow>
				<p>Reihenfolge</p>
				<input type="number" placeholder="1" bind:value={order} />
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
				<p>Vorlage</p>
				<select bind:value={template}>
					<option selected value={null}>Keine</option>
					{#each templates as temp}
						<option value={temp.id}>{temp.name}</option>
					{/each}
				</select>
			</ListItemRow>
			<ListItemRow>
				<p>Zugehöriges Szenario</p>
				<select disabled={scenariosDisabled} bind:value={scenario}>
					{#each scenarios as sce}
						<option value={sce.id}>{sce.name}</option>
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
