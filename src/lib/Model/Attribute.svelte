<script>
	import Factor from './Factor.svelte';
	import Collapsable from '$lib/Common/Collapsable.svelte';
	import ListItemRowAdd from '$lib/List/ListItemRowAdd.svelte';
	import FactorPrompt from '$lib/Prompt/FactorPrompt.svelte';
	import { del, unpack } from '$lib/utils/api';

	export let field;
	export let attribute;

	export let edit;

	let factorPrompt = false;
	let selectedFactor;

	async function refreshFactors(ev) {
		if (ev.detail.updated) {
			for (let index = 0; index < attribute.factors.length; index++) {
				if (attribute.factors[index].id === ev.detail.factor.id) {
					attribute.factors[index].name = ev.detail.factor.name;
					attribute.factors[index].description = ev.detail.factor.description;
					break;
				}
			}
		} else {
			attribute.factors = [...attribute.factors, ev.detail.factor];
		}
		sort();
	}

	async function removeFactor(factor) {
		const { res, err } = await unpack(() => del(`model/field/${field.id}/attribute/${attribute.id}/factor/${factor.id}`));
		if (res.id) {
			for (let index = 0; index < attribute.factors.length; index++) {
				if (attribute.factors[index].id === res.id) {
					attribute.factors.splice(index, 1);
					attribute.factors = [...attribute.factors];
					break;
				}
			}
		}
		sort();
	}

	function sort() {
		attribute.factors.sort((a, b) => a.order - b.order);
	}
	sort();
</script>

<div class="container">
	<p class="textBlock">{attribute.description}</p>
	{#each attribute.factors as factor}
		<Collapsable
			title={factor.name}
			expanded={true}
			remove={edit}
			on:remove={() => {
				removeFactor(factor);
			}}
			{edit}
			on:edit={() => {
				selectedFactor = factor;
				factorPrompt = true;
			}}
		>
			<Factor bind:factor {edit} {field} {attribute} />
		</Collapsable>
	{/each}
	{#if edit}
		<ListItemRowAdd text="Neue Frage hinzufügen" on:click={() => (factorPrompt = factorPrompt = true)} />
	{/if}
</div>

{#if edit}
	<FactorPrompt field={field.id} attribute={attribute.id} bind:factor={selectedFactor} on:success={refreshFactors} bind:open={factorPrompt} />
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
