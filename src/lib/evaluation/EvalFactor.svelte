<script>
	import Collapsable from '$lib/Common/Collapsable.svelte';
	import EvalQuestion from './EvalQuestion.svelte';

	export let field;
	export let attribute;
	export let factor;
</script>

<div class="container">
	<p class="textBlock">{factor.description}</p>
	{#each factor.criterias as criteria}
		<Collapsable title={criteria.name} expanded={true}>
			{#each criteria.questions as question}
				<EvalQuestion bind:question {field} {attribute} {factor} {criteria} />
			{/each}
		</Collapsable>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
