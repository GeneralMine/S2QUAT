<script>
	import Question from './Question.svelte';
	import Collapsable from '$lib/Common/Collapsable.svelte';

	export let category;
</script>

<div class="container">
	<p class="textBlock">{category.description}</p>
	{#each category.questions as question, i}
		<Collapsable title={question.name} expanded={true}>
			<Question bind:question />
		</Collapsable>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
