<script>
	import Surface from '$lib/Common/Surface.svelte';
	import Collapsable from '$lib/Common/Collapsable.svelte';
	import EvalAttribute from './EvalAttribute.svelte';

	export let field;
</script>

<Surface title={field.name}>
	<div class="container">
		<p class="textBlock">{field.description}</p>
		{#each field.attributes as attribute}
			<Collapsable
				title={`${attribute.name} (${attribute.factors.reduce(
					(accumulator, question) => accumulator + (question.answer && Object.keys(question.answer).length ? 1 : 0),
					0
				)}/${attribute.factors.length})`}
			>
				<EvalAttribute bind:attribute {field} expanded={true} />
			</Collapsable>
		{/each}
	</div>
</Surface>

<style>
	.container {
		padding-top: 1rem;
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
		padding-left: 2rem;
		padding-right: 2rem;
	}
</style>
