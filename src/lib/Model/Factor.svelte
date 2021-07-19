<script>
	import Criteria from './Criteria.svelte';
	import Collapsable from '$lib/Common/Collapsable.svelte';
	import CriteriaPrompt from '$lib/Prompt/CriteriaPrompt.svelte';
	import ListItemRowAdd from '$lib/List/ListItemRowAdd.svelte';
	import { del, unpack } from '$lib/utils/api';

	export let factor;
	export let attribute;
	export let field;

	export let edit;

	let selectedCriteria;
	let criteriaPrompt;

	async function refreshCriterias(ev) {
		if (ev.detail.updated) {
			for (let index = 0; index < factor.criterias.length; index++) {
				if (factor.criterias[index].id === ev.detail.criteria.id) {
					factor.criterias[index].name = ev.detail.criteria.name;
					factor.criterias[index].description = ev.detail.criteria.description;
					break;
				}
			}
		} else {
			factor.criterias = [...factor.criterias, ev.detail.criteria];
		}
		sort();
	}

	async function removeCriteria(criteria) {
		const { res, err } = await unpack(() => del(`model/field/${field.id}/attribute/${attribute.id}/factor/${factor.id}/criteria/${criteria.id}`));
		if (res.id) {
			for (let index = 0; index < factor.criterias.length; index++) {
				if (factor.criterias[index].id === res.id) {
					factor.criterias.splice(index, 1);
					factor.criterias = [...factor.criterias];
					break;
				}
			}
		}
		sort();
	}

	function sort() {
		factor.criterias.sort((a, b) => a.order - b.order);
	}
	sort();
</script>

<div class="container">
	<p class="textBlock">{factor.description}</p>
	{#each factor.criterias as criteria}
		<Collapsable
			title={criteria.name}
			expanded={true}
			remove={edit}
			on:remove={() => {
				removeCriteria(criteria);
			}}
			{edit}
			on:edit={() => {
				selectedCriteria = criteria;
				criteriaPrompt = true;
			}}
		>
			<Criteria bind:criteria />
		</Collapsable>
	{/each}
	{#if edit}
		<ListItemRowAdd text="Neues Kriterium hinzufügen" on:click={() => (criteriaPrompt = criteriaPrompt = true)} />
	{/if}
</div>

{#if edit}
	<CriteriaPrompt
		field={field.id}
		attribute={attribute.id}
		factor={factor.id}
		bind:criteria={selectedCriteria}
		on:success={refreshCriterias}
		bind:open={criteriaPrompt}
	/>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
