<script>
	import Collapsable from '$lib/Common/Collapsable.svelte';
	import EvalFactor from './EvalFactor.svelte';
	import EvalQuestion from './EvalQuestion.svelte';

	export let field;
	export let attribute;
</script>

<div class="container">
	<p class="textBlock">{attribute.description}</p>
	{#each attribute.factors as factor}
		<Collapsable title={factor.name} expanded={true}>
			{#if factor.questions.length > 0}
				{#each factor.questions as question}
					<EvalQuestion bind:question {field} {attribute} {factor} />
				{/each}
			{:else}
				<EvalFactor bind:factor {field} {attribute} />
			{/if}
		</Collapsable>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
